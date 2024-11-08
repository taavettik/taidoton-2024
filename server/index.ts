import fastify from 'fastify';

const server = fastify({
  logger: true
});

server.get('/', (req, res) => {
  console.log('asd')
  res.send('Hello world')
});

server.listen({
  port: 8080,
  host: '0.0.0.0'
}, () => {
  console.log(`Listening on 8080...`)
});