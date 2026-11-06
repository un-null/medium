# medium

A small private blog. A few writers publish long-form articles; readers can clap, not comment. It has a rich-text editor, drafts, publishing, and direct image uploads.

**Live:** [https://www.is-be.zip](https://www.is-be.zip)

![Home](docs/sc/home.png)

## How it works

![Architecture](docs/architecture.png)

Authors and readers are on the left. Blue edges are the write and read paths: Tiptap → Server Actions → Drizzle → Turso. The `presign` edge is the only direct browser-to-R2 path, so image bytes never pass through the app server. Dashed edges are development tooling.

## Screenshots

*Articles*

![Article list](docs/sc/articles.png)

*Article*

![Article page](docs/sc/article.png)

*Editor*

![Editor](docs/sc/editor.png)

## Stack


| Layer   | Choice                                                                        |
| ------- | ----------------------------------------------------------------------------- |
| App     | Next.js 16 (App Router, React Server Components, Server Actions, `use cache`) |
| UI      | React 19, Tailwind CSS 4, shadcn/ui, next-themes                              |
| Editor  | Tiptap 3 with `tiptap-markdown`                                               |
| Content | `next-mdx-remote/rsc`, `remark-gfm`                                           |
| Data    | Turso (libSQL), Drizzle ORM                                                   |
| Auth    | HMAC-SHA256 signed cookie (Web Crypto), bcryptjs                              |
| Images  | Cloudflare R2 with S3 presigned uploads                                       |
| Tooling | TypeScript, Biome, pnpm                                                       |


## Design decisions

### ① Writes through Server Actions, reads through RSC

All writes are Server Actions: save, delete, publish, clap, login, and upload signing. Reads call Drizzle directly from server components, and public queries only return published posts.

This keeps the app in one deployable. The cost is no public API, which is fine because the blog has one web client.

Article text is stored twice: `content_json` for the editor and `content_mdx` for the public page. The serializer keeps them in sync, but they can drift if a write skips the editor.

### ② A hand-rolled HMAC session

Login checks a bcrypt password and sets a signed `${authorId}.${exp}.${signature}` cookie. The signature is HMAC-SHA256 over `EDITOR_SECRET`, and the token expires after 24 hours. Every protected action checks it again, so there is no session table.

This keeps the app stateless and needs no auth framework, which fits a private blog with a few trusted writers. The cost is that tokens cannot be revoked one by one, and all authors share one key. It is not a general-purpose account system.

### ③ Presigned uploads to R2

The editor asks a Server Action for an upload URL. The action checks the session, then signs a short-lived `PUT` for one object. The browser sends the file straight to R2 and puts the public URL in the Markdown.

Image bytes never pass through Next.js, so large files do not hit request limits or keep a function busy. R2 credentials stay on the server.

The cost is that the bucket must be public, and there is no delete path or cleanup for unused images.

### ④ Turso and Drizzle

Turso's libSQL over HTTP works from serverless functions without a connection pool. Drizzle provides a typed schema and SQL-shaped queries with little runtime overhead.

Schema changes are applied with `drizzle-kit push`. There are no migration files in the repository, so there is no migration history to review or roll back.

### 　⑤ Compared with go-next

[go-next](https://github.com/un-null/go-next) takes the other side of the same boundary: a Go API (Echo, sqlc, PostgreSQL) and a React Router SPA. The API is explicit and reusable, and the backend can be tested alone, at the cost of more code to keep in sync across two projects.

medium keeps the boundary inside Next.js: Server Actions for writes, RSC for reads, no standalone API. There is less glue, but a second client such as a mobile app would need an API built from scratch.

They are two answers to "where does the server boundary go", not two versions of the same design.

## Running locally

This repository is a design record, not a reusable template. It runs against a private database and bucket, so the setup below is a short memo rather than a reproducible install.

Node.js 20.9+, pnpm, Turso, and an R2 bucket whose CORS rule allows `PUT` from the app origin. Copy `.env.example` to `.env.local` and fill it in.

```bash
pnpm install
pnpm exec drizzle-kit push
pnpm dev
```

There is no signup. Insert an author into `authors` with a bcrypt hash:

```bash
node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 12))" 'replace-me'
```

`pnpm build` is the production check, `pnpm check` runs Biome, and there are no tests.

## Known limitations

The blog is single-tenant: no signup, roles, password reset, or account management UI.

- **`EDITOR_SECRET` is a single point of failure.** All authors share one signing key, so a leak lets anyone mint a session for any author id. It must be at least 32 characters; if it is missing or too short, session operations throw at runtime instead of failing at startup. If it leaks, rotate it and redeploy.
- **Sessions cannot be revoked.** Tokens expire 24 hours after login, but deleting an author or changing a password does not invalidate already-issued tokens. Only rotating the secret ends all sessions.
- **No rate limiting** on login or claps.
- **Images are public.** Uploads are limited to JPEG, PNG, WebP, and GIF, but there is no delete path or orphan cleanup.
- **MDX is trusted input.** Article bodies are rendered without sanitization. This is safe only because writes require an author session.
- **No automated tests or CI.** `pnpm check` runs Biome.
- **Schema changes use `drizzle-kit push`.** There are no migration files, so there is no migration history.