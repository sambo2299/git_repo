const logger = require('../system/logger');

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
let file =  path.join(__dirname, `../../env/${process.env.NODE_ENV}.env`);
console.log(file);
if (!fs.existsSync(path.resolve(file))) {
  file = path.join(__dirname, '../../env/dev.env');
}
dotenv.config({
  path: file,
  debug: false
})

const config = {  
  node_env: process.env.NODE_ENV,
  rootdir: path.resolve(__dirname, '../../'),
  port: process.env.PORT || 8080,
  git_api: process.env.GIT_API  
}

console.log(config);

module.exports = config;