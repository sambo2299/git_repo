const config = require('../../config');
const logger = require(`${config.rootdir}/server/system/logger`);

const request = require('request');

module.exports.makeRequest = (method, url, data, headerOptions) => new Promise((resolve, reject) => {
  const options = {
    uri: url,
    method: method,
    headers: {
      'User-Agent': 'request'
    }
  }
  if(data) {
    options["data"] = data;
  }
  if(headerOptions) {
    options["header"] = {...options.headers, ...headerOptions}
  }
  console.log(options)
  request(options, async(error, response, body) => {
    if(error) {
      logger.error(error);
      reject();
    }        
    resolve(body)
  });
});


