# Remix + Vite Sample Project

This repo is a sample project to showcase how to use Remix on a high level.

There will be obvious mistakes and all in here due to how quickly this was made, so please ignore :D

## Development

1. Create a `.env` file at the root of your project.
2. Inside the env file add a `COOKIE_SECRET` and assign a random string
3. Run the dev server by running `make up-dev` in your terminal

_**Note:** We are making use of an nginx proxy in development as the authentication cookie flow requires HTTPS. Therefore, when launching the app it will open at `https://localhost`_

## Remix Run Docs

For detailed explanations and how the framework functions in general check out the [Remix Run docs](https://remix.run/docs/en/main)
