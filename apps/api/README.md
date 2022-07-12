# evan.io CMS

Here we use [Strapi](https://strapi.io/), and deploy using [Railway](https://railway.app) which will internally use a PostgreSQL database to store the data. For media storage we use [Cloudinary](https://cloudinary.com), since Railway's filesystem is ephemeral.

## Getting Started

First, run the development server:

```sh
pnpm strapi
```

Now, we can open [http://localhost:5000](http://localhost:5000) and head to the `/admin` endpoint.

To test the graphql playground, head over to the `/graphql` endpoint, or find the documentation at `/documentation`. A [Prometheus](https://prometheus.io/) metrics endpoint is available at `/api/metrics`.

Remember to give roles/permissions for your collections, found under `Settings > Roles > Collections Name` in the admin panel.

## Deployment

For deployment, we can either setup automated deployment triggers within the Railway UI. Since we run in an isolated monorepo, we have to set the root directory to `apps/api`.

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

### Gotchas

-   If you want to manage your resume/cv through cloudinary, remember to [enable pdf sharing](https://support.cloudinary.com/hc/en-us/articles/360016480179-PDF-or-ZIP-files-appearing-in-Media-Library-but-download-URLs-return-an-error-)
-   If you have a docker container which uses newer features that require BuildKit, enable it in Railway with `DOCKER_BUILDKIT=1`
