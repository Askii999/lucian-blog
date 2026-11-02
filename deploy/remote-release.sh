#!/usr/bin/env bash
set -euo pipefail
release_id=${1:?Missing release ID}
expected=${2:?Missing archive SHA-256}
[[ "$release_id" =~ ^[0-9a-f]{40}$ ]]
[[ "$expected" =~ ^[0-9a-f]{64}$ ]]
base=/opt/still-blog
archive="$base/incoming/$release_id.tgz"
release="$base/releases/gha-$release_id"
test -f "$archive"
printf '%s  %s\n' "$expected" "$archive" | sha256sum -c -
if test -e "$release"; then echo 'Release already exists; refuse to overwrite.' >&2; exit 1; fi
listing=$(mktemp "$base/incoming/.archive-list.XXXXXX")
trap 'rm -f "$listing"' EXIT
tar -tzf "$archive" > "$listing"
if grep -Eq '(^/|(^|/)\.\.(/|$))' "$listing"; then echo 'Unsafe archive path' >&2; exit 1; fi
mkdir "$release"
tar -xzf "$archive" -C "$release"
test -s "$release/server.js"
test -s "$release/content/profile.json"
chgrp -hR still-blog "$release"
chmod -R u=rwX,g=rX,o= "$release"
sudo -n /usr/local/sbin/still-blog-activate "$release_id"
