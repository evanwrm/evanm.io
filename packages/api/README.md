# evan.io CMS

Here we use [Strapi](https://strapi.io/), and deploy using [Railway](https://railway.app) which will internally use a PostgreSQL database to store the data. For media storage we use [Cloudinary](https://cloudinary.com), since Railway's filesystem is ephemeral.

# Getting Started

First, run the development server:

```sh
npm run strapi
# or
yarn strapi
```

Now, we can open [http://localhost:5000](http://localhost:5000) and head to the `/admin` endpoint.

# Deployment

For deployment, we can either setup automated deployment triggers within the Railway UI. Since we run in an isolated monorepo, we have to set the root directory to `packages/api`.

We can also use the [Railway CLI](https://docs.railway.app/develop/cli), which can be installed:

```sh
npm i -g @railway/cli
```

Now we can simply login, and link our project to the existing one:

```sh
railway login # login to your account
railway link # link cwd to an existing project
railway up # upload cwd and deploy
```
