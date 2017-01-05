/**
 * Created by mac002 on 1/2/17.
 */

const server = "https://" + document.location.hostname;
const adminApi = "/admin/api/v1/";
const dbApi = "/db/api/v1/";

module.exports = {
  getServerAdminApi: () => { return server + adminApi;}
  , getServerDbApi: () => { return server + dbApi;}
}
