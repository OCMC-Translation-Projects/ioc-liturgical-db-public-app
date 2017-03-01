/**
 * Created by mac002 on 1/2/17.
 */

const adminApi = "/admin/api/v1/";
const dbApi = "/db/api/v1/";
const user = "/user/";
const useRemoteNet = false;
const useRemoteOrg = false;

var getDbServer = () => {
  if (document.location.hostname === "localhost" || document.location.hostname.endsWith("c9users.io")) {
    if (useRemoteNet) {
      return "https://www.ioc-liturgical-db.net";
    } else if (useRemoteOrg) {
      return "https://www.ioc-liturgical-db.org";
    } else {
      return document.location.protocol +  "//" + document.location.hostname + ":7474";
    }
  } else {
    return document.location.protocol +  "//www." + document.location.hostname;
  }
}

var getWsServer = () => {
  if (document.location.hostname === "localhost") {
    return document.location.protocol +  "//" + document.location.hostname + ":4567";
  } else {
    if (document.location.hostname.endsWith("net")) {
      return document.location.protocol +  "//ioc-liturgical-ws.net";
    } else {
      return document.location.protocol +  "//ioc-liturgical-ws.org";
    }
  }
}

module.exports = {
  isReadOnly: () => {
    return document.location.hostname.endsWith("org") || document.location.hostname === "localhost" || document.location.hostname.endsWith("c9users.io");
  },
  getDbUserAuthPath: () => {
    return getDbServer() + user;
  }
  , getDbServerPath: () => { return getDbServer();}
  , getWsServerPath: () => { return getWsServer();}
  , getWsServerAdminApi: () => { return getWsServer() + adminApi;}
  , getWsServerDbApi: () => { return getWsServer() + dbApi;}
}
