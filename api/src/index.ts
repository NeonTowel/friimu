import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authMiddleware } from './middleware/auth'

type Bindings = {
  DB: D1Database
  AUTH0_DOMAIN: string
  AUTH0_AUDIENCE: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
  origin: ['http://localhost:5173', 'https://friimu.app'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (c) => {
  return c.json({ message: 'Friimu.app API v1.0.0', status: 'healthy' })
})

app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

app.get('/api/v1/games', authMiddleware(), async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM games WHERE status = ? ORDER BY created_at DESC'
  ).bind('active').all()
  
  return c.json({ games: results, count: results.length })
})

app.get('/api/v1/games/:id', authMiddleware(), async (c) => {
  const id = c.req.param('id')
  const game = await c.env.DB.prepare(
    'SELECT * FROM games WHERE id = ? AND status = ?'
  ).bind(id, 'active').first()
  
  if (!game) {
    return c.json({ error: 'Game not found' }, 404)
  }
  
  return c.json({ game })
})

app.post('/api/v1/sync/freetogame', async (c) => {
  try {
    const response = await fetch('https://www.freetogame.com/api/games')
    const games = await response.json()
    
    let inserted = 0
    let updated = 0
    
    for (const game of games) {
      const existing = await c.env.DB.prepare(
        'SELECT id FROM games WHERE external_id = ?'
      ).bind(game.id).first()
      
      if (existing) {
        await c.env.DB.prepare(`
          UPDATE games SET 
            title = ?, short_description = ?, game_url = ?, genre = ?, 
            platform = ?, publisher = ?, developer = ?, release_date = ?,
            freetogame_profile_url = ?, thumbnail = ?, updated_at = CURRENT_TIMESTAMP
          WHERE external_id = ?
        `).bind(
          game.title, game.short_description, game.game_url, game.genre,
          game.platform, game.publisher, game.developer, game.release_date,
          game.freetogame_profile_url, game.thumbnail, game.id
        ).run()
        updated++
      } else {
        await c.env.DB.prepare(`
          INSERT INTO games (
            external_id, title, short_description, game_url, genre,
            platform, publisher, developer, release_date,
            freetogame_profile_url, thumbnail
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          game.id, game.title, game.short_description, game.game_url, game.genre,
          game.platform, game.publisher, game.developer, game.release_date,
          game.freetogame_profile_url, game.thumbnail
        ).run()
        inserted++
      }
    }
    
    return c.json({ 
      message: 'Sync completed successfully',
      inserted,
      updated,
      total: games.length
    })
  } catch (error) {
    return c.json({ error: 'Sync failed', details: error.message }, 500)
  }
})

export default app
