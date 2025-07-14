# Friimu.app

We're building a web app that let's users to browse free to play games with various filtering and sorting options.

Our API deploys to Cloudflare Workers and uses HonoJS framework with Cloudflare bindings, when applicable.

Our UI deploys to Netlify and uses SvelteKit framework.

Package manager is bun.

UI is in `/ui` and it's production URL is https://friimu.app
API is in `/api`. and it's production URL is https://api.friimu.app

## Game Databases

Our app will have an intermediary database of games. Our UI uses data from our intermediary database (D1) via our API.

Our API has endpoints to update the database from external game databases:

- https://www.freetogame.com/api-doc

Our API will have support for multiple game databases and in the future we will implement several external game databases for fetching the data to our master intermediary database.

## API Authentication

If possible, implement API authentication using Auth0 machine credentials. Users don't login to our web app but the API should allow authenticated requests only from our web app.

UI should authenticate to Auth0 using machine-to-machine authentication for bearer tokens to access UI-facing API endpoints.

## UI

User Interface should look modern, responsive and utilize Tailwind that is already scaffolded to the SvelteKit.

Theme should follow our style guide in [/.agent/ui-themes.md](/.agent/ui-themes.md).
