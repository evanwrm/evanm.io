# evanm.io Next.js

This is the frontend component of the portfolio website

## Getting Started

First, run the development server:

```sh
npm run dev
# or
yarn dev
```

Now, we can open [http://localhost:3000](http://localhost:3000) and begin developement.

Alternatively, we can analyze bundle sizes by setting the `ANALYZE` environment variable, and building the app:

```sh
ANALYZE=true yarn build
```

# Deployment

For deployment, we will deploy to [Vercel](https://vercel.com/). Development hooks can be setup to listen for changes on the Git repo, and automatically deploy changes.

We can also use the [Vercel CLI](https://vercel.com/docs/cli), which can be installed:

```sh
npm i -g vercel
```

Now we can simply login, and deploy:

```sh
vercel login # login to your account
vercel # deploy from the root of the web directory
```
