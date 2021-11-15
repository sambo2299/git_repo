const express = require("express");

const gitApiController =  require("./gitApi.controller");

const gitApiRouter = express.Router();
  
gitApiRouter.route('/search')
.get( gitApiController.searchRepo);

gitApiRouter.route('/:user/:reponame')
.get(gitApiController.getRepoDetail);

// gitApiRouter.route('/users/:user')
// .get(gitApiController.getUserInfo);

// gitApiRouter.get('/:user/:reponame/readme', gitApiController.getReadMeContent)

module.exports = gitApiRouter;
