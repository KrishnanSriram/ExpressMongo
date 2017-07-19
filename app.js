const app = require('express')();
const routes = require('./routes');
const morgan = require("morgan");

app.use(morgan('combined'));
app.use('/', routes);
const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, function() {
    console.log('Ready on port %d', server.address().port);
});
