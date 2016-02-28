var tools = require('../../tools');

module.exports = function (Analysis) {

  Analysis.js = function (req, res, cb) {
    var url = req.url;
    var ip = req.ip;
    var refer = req.get("Referrer");
    var token = url.substring(url.lastIndexOf("/") + 1, url.length);
    var App = tools.getModelByName("App");

    res.send({
      token: token,
      url: req.url,
      Referrer: req.get("Referrer"),
      ip: req.ip
    });

    App.findOne({
      where: {
        appToken: token
      }
    }).then(function (app) {
      if (app == null) {
        return cb()
      }
      Analysis.create({
        visitUrl: refer,
        visitIp: ip,
        appId: app.id
      }).then(function (analysis) {
        return cb()
      }).catch(function () {
        return cb()
      });
    }).catch(function () {
      return cb()
    });
  };


  Analysis.remoteMethod("js", {
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    returns: null,
    http: {path: "/js/*", verb: "get"}
  });
};
