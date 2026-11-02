#!/usr/bin/env bash
# Install root-owned; the deployment account may invoke only this helper.
set -euo pipefail
[[ "$#" = 1 && "$1" =~ ^[0-9a-f]{40}$ ]]
base=/opt/still-blog
candidate="$base/releases/gha-$1"
test -d "$candidate"
test ! -L "$candidate"
test "$(readlink -f "$candidate")" = "$candidate"
test -s "$candidate/server.js"
test -s "$candidate/content/profile.json"
previous=$(readlink -f "$base/current")
case "$previous" in "$base"/releases/*) ;; *) exit 1;; esac
rollback(){
 ln -sfn "$previous" "$base/.current-actions-rollback"
 mv -Tf "$base/.current-actions-rollback" "$base/current"
 systemctl restart still-blog.service
}
trap rollback ERR
ln -sfn "$candidate" "$base/.current-actions-$1"
mv -Tf "$base/.current-actions-$1" "$base/current"
systemctl restart still-blog.service
healthy=0
for attempt in {1..20}; do
 if curl -fsS --max-time 3 http://127.0.0.1:3001/blog -o /dev/null; then healthy=1; break; fi
 sleep 1
done
test "$healthy" = 1
curl -fsS --max-time 5 http://127.0.0.1:3001/feed.xml -o /dev/null
systemctl is-active still-blog.service
trap - ERR
printf 'Active release: %s\nPrevious release: %s\n' "$candidate" "$previous"
