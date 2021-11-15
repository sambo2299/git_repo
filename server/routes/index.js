const GitApiRouter = require('../controller/gitApiController');

const routes = (app) => {
  app.use('/api/repo/', GitApiRouter)
  
  app.get('/', (req, res) => {
    res.render('index')
  })
}

module.exports = routes;
