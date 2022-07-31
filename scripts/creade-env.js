const fs = require('fs');
fs.writeFileSync('./.env', `API=${process.env.API}\n`) // creando la funcion para que reconozca el servidor el .env