import jsonServer from 'json-server'
import env from './config'
import chalk from "chalk"

const srv = jsonServer.create();
const middlewares = jsonServer.defaults();
const route = jsonServer.router(`${env.ENV_PROJECTPATH}/data/json/db.json`);


srv.use(middlewares)
srv.use((req, res, next) => {
  if (req.method === 'POST') {
    res.jsonp({
      code: 0,
      result: {
        order_id: '2342sdfasf',
        price: 232
      }
    })
  }
  next()
})

srv.use(route)
srv.listen(3000, () => console.log(chalk.black(chalk.bgWhite(`JSON api server is running at http://localhost:3000`))))