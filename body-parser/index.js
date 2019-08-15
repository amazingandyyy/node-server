const FORM_URLENCODED = 'application/x-www-form-urlencoded';
const FORM_JSON = 'application/json';
const FORM_DATA = 'multipart/form-data';
const { RequestMethods } = require('../constants.js')
const qs = require('./querystring');

const serverParser = (req, res, next) => {
  if (req.method.toString() === RequestMethods.PUT || req.method.toString() === RequestMethods.POST) {
    if(req.headers['content-type'].includes(FORM_URLENCODED)){
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        req.body = qs.parse(body)
        next();
      });
    } else if(req.headers['content-type'].includes(FORM_JSON)){
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        req.body = JSON.parse(body);
        next();
      });
    }else if(req.headers['content-type'].includes(FORM_DATA)){
      next(`Doesn\'t support ${FORM_DATA} yet.`);
    }else{
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      })
      req.on('end', () => {
        req.body = JSON.parse(body);
        next();
      });
    }
  }
}

module.exports = serverParser;
