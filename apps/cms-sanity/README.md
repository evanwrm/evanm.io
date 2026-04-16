# Sanity Content Studio

Simple Sanity CMS app.

## Deployment

There are two options of deployment,

1. deploying to a hosted instance of sanity (https://evanm.sanity.io):

    ```sh
    pnpx sanity deploy
    ```

2. The second way is to self-host Sanity studio. This can be done through any static hosting provider. Here we use Vercel to match other deployments. This is found at https://api.evanm.io.

## Docker

Build the image from the repository root, and run the image:

```sh
docker build -f apps/cms-sanity/Dockerfile -t evanmio-sanity .
docker run --rm -p 3333:80 evanmio-sanity
```
