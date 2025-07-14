# Friimu.app API

## Authentication Setup

This API uses Auth0 machine-to-machine authentication. Your frontend will get a token and include it with requests.

### Auth0 Configuration

1. Create an Auth0 application (Machine to Machine)
2. Create an API in Auth0 with identifier: `https://api.friimu.app`
3. Update environment variables in `wrangler.jsonc`:
   - `AUTH0_DOMAIN`: Your Auth0 domain (e.g., `your-domain.auth0.com`)
   - `AUTH0_AUDIENCE`: Your API identifier (`https://api.friimu.app`)

### Frontend Integration

Your UI should:

1. Get a token using Auth0 client credentials:

```javascript
const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    client_id: "your-client-id",
    client_secret: "your-client-secret",
    audience: "https://api.friimu.app",
    grant_type: "client_credentials",
  }),
});
const { access_token } = await response.json();
```

2. Include the token in API requests:

```javascript
fetch("/api/v1/games", {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});
```

## API Endpoints

### Public Endpoints

- `GET /` - API info
- `GET /health` - Health check

### Protected Endpoints (require Auth0 token)

- `GET /api/v1/games` - List all games
- `GET /api/v1/games/:id` - Get specific game
- `POST /api/v1/sync/freetogame` - Sync games from FreeToGame API

## Development

```bash
bun install
bun run dev
```

## Database Setup

```bash
wrangler d1 create friimu
wrangler d1 execute friimu --file=schema.sql
```
