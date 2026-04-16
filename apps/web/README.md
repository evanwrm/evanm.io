# evanm.io Astro

This is the frontend component of the portfolio website.

## Getting Started

First, run the development server:

```sh
pnpm dev

# Fill out environment variables
cp .env.example .env
```

Now, open [http://localhost:4321](http://localhost:4321) and begin development.

To build the production site:

```sh
pnpm build && pnpm start
```

## Docker

Build the image from the repository root, and run the image:

```sh
docker build -f apps/web/Dockerfile -t evanmio-web .
docker run --rm -p 4321:4321 \
    -e SITE_URL="https://yourdomain.com" \
    -e SANITY_PROJECT_ID=your-project-id \
    -e SANITY_DATASET=production \
    -e SANITY_API_VERSION=2024-01-01 \
    evanmio-web
```

## Deployment

For deployment, we deploy to [Vercel](https://vercel.com/). Development hooks can be setup to listen for changes on the Git repo, and automatically deploy changes.

We can also use the [Vercel CLI](https://vercel.com/docs/cli), which can be installed:

```sh
npm i -g vercel
```

Now we can simply login, and deploy:

```sh
vercel login # login to your account
vercel # deploy from the root of the web directory
```
