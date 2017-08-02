/**
 * Created by mac002 on 1/2/17.
 */
import axios from 'axios';

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
      return document.location.protocol +  "//ioc-liturgical-db.net";
//      return document.location.protocol +  "//ioc-liturgical-ws.net";
    } else {
      return document.location.protocol +  "//ioc-liturgical-db.org";
//      return document.location.protocol +  "//ioc-liturgical-ws.org";
    }
  }
}

export default {
  getDbInfo: () => {
    return new Promise(function(resolve,reject) {
      axios.get(getWsServer() + "/admin/api/v1/info"
      )
        .then(response => {
          resolve(
              response.data
          );
        })
        .catch( (error) => {
          reject(Error());
        });
    })
  }
  , isReadOnly: () => {
    axios.get(getWsServer() + "/admin/api/v1/info"
    )
    .then(response => {
      console.log("ws responded");
      return response.data.databaseReadOnly;
    })
    .catch( (error) => {
      return false; // when in doubt, protect it
    });
  },
  getDbUserAuthPath: () => {
    return getDbServer() + user;
  }
  , getDbServerPath: () => { return getDbServer();}
  , getWsServerPath: () => { return getWsServer();}
  , getWsServerAdminApi: () => { return getWsServer() + adminApi;}
  , getWsServerDbApi: () => { return getWsServer() + dbApi;}
}
