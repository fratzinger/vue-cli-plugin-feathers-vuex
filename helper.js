const path = require("path");

const feathersPath = "./src/store/feathers";
const feathersClientFile = path.join(feathersPath, "/client.js");
const servicesPath = path.join(feathersPath, "services");

module.exports = {
  feathersPath,
  feathersClientFile,
  servicesPath
}
