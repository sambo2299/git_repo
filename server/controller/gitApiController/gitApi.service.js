const config = require('../../config')
const logger = require(`${config.rootdir}/server/system/logger`);
const helper = require('../../lib/helper/helper');



const searchApi = 'search/repositories'

module.exports.searchRepo = async(query) => {
  if(!query || !query.q) {
    logger.error('no query params');
    return ({
      repos: null,
      msg: 'no query params'
    });
  }
  const searchParam = query.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const url = `${config.git_api}/${searchApi}?q=${query.q}&page=${page}&per_page=${limit}`;
  try {
    const response = await helper.makeRequest('GET', url, null, { "Accept": "application/vnd.github.v3+json" }); 
    if(!response) throw 'error @ make request'
    try {
      const {total_count, items} = JSON.parse(response);
      const repos = await items.map(itm => ({
        id: itm.id,
        owner_id: itm.owner.id,
        name: itm.name,
        author: itm.owner.login,
        stars:itm.stars,
        watchers: itm.watchers,
        description: itm.description,
        forks: itm.forks,
        last_update: itm.updated_at,
        stars: itm.watchers_count,
        default_branch: itm.default_branch,
        open_issues_count: itm.open_issues_count,
        link: itm.html_url
      }))
      return ({
        total: total_count,
        repos,
        msg: 'repos fetched'
      })
    } catch(ex) {
      logger.error(ex)  ;
      return null;
    }
    
  } catch(ex) {
    logger.error(ex);
    return null;
  } 
}

module.exports.getUserInfo = async(params) => {
  if(!params || !params["user"]) {
    logger.error('user not specified');
    return ({
      userInfo: null,
      message: 'user not specified'
    })
  }
  const {user} = params;
  const url = `${config.git_api}/users/${user}`;
  const response = await helper.makeRequest('GET', url, null, null);
  console.log(response);
  if(!response) throw 'error @ make request';
  try {
    const userresponse = JSON.parse(response);
    const userInfo = {
      name: userresponse.name,
      company: userresponse.company,
      email: userresponse.email,
      link: userresponse.html_url,
      repos_url: userresponse.repos_url
    }    
    
    return ({
      message: 'user info fetched',
      userInfo: userInfo
    })
  } catch(ex) {
    logger.error(ex);
    return null;
  }
}

module.exports.getReadMeContent = async(params) => {
  if(!params || !params.user || !params.reponame) {
    logger.error('repo name not specified');
    return({
      message: 'repo name not specified',
      readMe: null
    })
  }
  const {user, reponame} = params;
    const url = `${config.git_api}/repos/${user}/${reponame}/readme`;
    const response = await helper.makeRequest('GET', url, null, null);        
    if(!response) throw 'error @ make request';
    const {content} = JSON.parse(response);
    return {
      message: 'readme content fetched',
      data: content
    }
}