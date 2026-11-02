#!/usr/bin/env bash
set -euo pipefail
release_id=${1:?Missing release ID}
expected=${2:?Missing archive SHA-256}
[[ "$release_id" =~ ^[0-9a-f]{40}$ ]]
[[ "$expected" =~ ^[0-9a-f]{64}$ ]]
base=/opt/lucian-blog
archive="$base/incoming/$release_id.tgz"
release="$base/releases/$release_id"
test -f "$archive"
printf '%s  %s\n' "$expected" "$archive" | sha256sum -c -
if test -e "$release"; then echo 'Release already exists; refuse to overwrite.' >&2; exit 1; fi
# The archive is built by trusted main-branch CI, never by a fork PR deployment.
if tar -tzf "$archive" | grep -Eq '(^/|(^|/)\.\.(/|$))'; then echo 'Unsafe archive path' >&2; exit 1; fi
mkdir "$release"
tar -xzf "$archive" -C "$release"
test -s "$release/server.js"
test -s "$release/content/profile.json"
previous=$(readlink -f "$base/current" || true)
restore(){
 if test -n "$previous" && test -d "$previous"; then ln -sfn "$previous" "$base/current"; sudo -n /bin/systemctl restart lucian-blog.service; fi
}
trap restore ERR
ln -sfn "$release" "$base/current"
sudo -n /bin/systemctl restart lucian-blog.service
healthy=0
for attempt in {1..20}; do
 if curl -fsS --max-time 3 http://127.0.0.1:3002/blog -o /dev/null; then healthy=1; break; fi
 sleep 1
done
test "$healthy" = 1
curl -fsS --max-time 5 http://127.0.0.1:3002/feed.xml -o /dev/null
systemctl is-active lucian-blog.service
trap - ERR
printf 'Active release: %s\nPrevious release: %s\n' "$release" "$previous"
