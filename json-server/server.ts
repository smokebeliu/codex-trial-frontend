import jsonServer from 'json-server';

import {db} from './db';

const PORT = 3001;

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

/** set default middlewares (logger, static, cors and no-cache) */
server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
  console.log(`started on PORT ${PORT}`);
});
