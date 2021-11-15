const config = require('../../config')
const logger = require(`${config.rootdir}/server/system/logger`);
const gitApiService = require('./gitApi.service');


module.exports.searchRepo = async(req, res) => {
  try {
    console.log(req.query)
    const searchResponse = await gitApiService.searchRepo(req.query);    
    if(!searchResponse) throw('error at query search');    
    res.status(200).send({
      message: 'repos fetched',
      
      data: {
        total: searchResponse.total ? searchResponse.total : 0,
        repos: searchResponse.repos.length ? searchResponse.repos : []
      },
    });
  } catch(ex) {
    logger.error(ex);
    res.status(500).send({
      message: ex.msg || 'repos could not be fetched!!!'
    });
  }
}

module.exports.getRepoDetail = async(req,res) => {
  try {
   const userresponse = await gitApiService.getUserInfo(req.params);
   const readMeResponse = await gitApiService.getReadMeContent(req.params);
   res.status(200).send({
     userInfo: userresponse.userInfo,
     readMeContent: readMeResponse.data
   })

  } catch(ex) {
    logger.error(ex);
    res.status(500).send({
      message: 'repo detail not fetched'
    })
  }
}
