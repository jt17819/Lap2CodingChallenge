const app = require('./server');

const port = 3000;

app.listen(port, () => console.log(`Express now departing from port ${port}!`))
