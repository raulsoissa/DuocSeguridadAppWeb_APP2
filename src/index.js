const app = require('./app');
const dotenv = require('dotenv').config();
require('./database');

async function main() {
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();