/**
 * Created by mac002 on 1/2/17.
 */


// because of the way the install bash script works
// the last number needs to be 9 or less
const packageNumber = "1.7.2";

module.exports = {
  getPackageNumber: () => { return packageNumber;}
}
