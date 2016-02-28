var tools = require("../../tools");

module.exports = function (App) {

  App.info = function (name, url, cb) {
    var userInfo = tools.getUser() || {};
    App.create({
      appToken: tools.getUUid(8),
      siteUrl: url,
      siteName: name,
      enable: 1,
      ownerId: userInfo.userId
    }).then(function (app) {
      cb(null, app);
    }).catch(function (err) {
      cb(err, 'err')
    })
  };


  App.remoteMethod("info", {
    accepts: [
      {arg: 'siteName', type: 'string'},
      {arg: 'siteUrl', type: 'string'}
    ],
    returns: {arg: 'app', type: 'object'},
    http: {path: "/info", verb: "post"}
  });
};
