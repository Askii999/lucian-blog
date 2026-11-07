# Lucian's Blog

[lucian.me.uk](https://lucian.me.uk/) · Notes on technology and life.

## Stack

React 19, TypeScript, Vinext / Vite, Cloudflare Workers, and Tailwind CSS (Node.js 24 for builds).
Markdown and YAML for content, Giscus Discussions for comments, and OpenCC for language conversion.

## Architecture

Markdown / JSON → build-time validation and content snapshot → Workers page routes → React + Coral.

- `app/`: home, journal, archives, tags, explore, friends, and about pages.
- `components/`: UI and interactions; `app/coral/`: styles and design tokens.
- `content/posts/`: articles, including the unpublished [template](content/posts/template.md); `content/about.*.md`: about pages; `content/profile.json`: author information.
- `content/friends.json`: friend links; `public/`: static assets.
- `lib/`: content loading, localization, and shared logic.


## Friend Links

Append an entry to [`content/friends.json`](content/friends.json) and open a pull request.

## License

Code: MIT. Original writing: CC BY-NC-SA 4.0. See [LICENSE](LICENSE).
