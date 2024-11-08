import fastify from 'fastify';
import './src/common/db';
import { getDb } from './src/common/db';

const server = fastify({
  logger: true
});

server.get('/', async (req, res) => {
  const db = await getDb();

  res.send('Hello world')
});

server.listen({
  port: 8080,
  host: '0.0.0.0'
}, () => {
  console.log(`Listening on 8080...`)
});