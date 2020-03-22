import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";
import io from "socket.io-client";
import feathersVuex from "feathers-vuex";

const host = "<%= serverUrl %>"

const socket = io(host, {
  transports: ["websocket"]
});

const feathersClient = feathers()
  .configure(socketio(socket, {
    timeout: 7000
  }))
  .configure(auth({ storage: window.localStorage }));

export default feathersClient;

// Setup feathers-vuex
const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
} = feathersVuex(feathersClient, {
  serverAlias: "api", // or whatever that makes sense for your project
  idField: "id", // `id` and `_id` are both supported, so this is only necessary if you're using something else.,
  tempIdField: "_idTemp"
});

export {
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex,
  host,
  socket
};