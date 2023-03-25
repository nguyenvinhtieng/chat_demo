const Main = require('./mainRoute')
function route(app) {
    app.use('/api', Main)
}
module.exports = route;