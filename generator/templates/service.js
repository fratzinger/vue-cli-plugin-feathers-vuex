/* eslint-disable no-unused-vars */

import feathersVuex from 'feathers-vuex';
import feathersClient from '%CLIENTPATH%';

const { service } = feathersVuex(feathersClient, { idField: '%IDFIELD%' });

const servicePath = '%SERVICEPATH%';
const servicePlugin = service(servicePath, {
%INSTANCEDEFAULTS%
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
