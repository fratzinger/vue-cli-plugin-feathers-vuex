/* eslint-disable no-unused-vars */

import feathersVuex from 'feathers-vuex';
import feathersClient from '<%= clientPath %>';

const { service } = feathersVuex(feathersClient, { idField: '<%= idField %>' });

const servicePath = '<%= servicePath %>';
const servicePlugin = service(servicePath, {
<% if (customizeStore) { -%>
  state: {},
  getters: {},
  mutations: {},
  actions: {},
<% } -%>
<% if (instanceDefaults == "obj") { -%>
  instanceDefaults: {

  },
<%_ } else { -%>
  instanceDefaults(data, { store, Model, Models }) {
    return {
    };
  },
<%_ } -%>
});

feathersClient.service(servicePath)
  .hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
  });

export default servicePlugin;
