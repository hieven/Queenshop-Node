'use strict';

const config = require('./config');
const server = require('./server');

server.listen(config.port, () => {
  console.log(`listening on port:${config.port}`);
})
