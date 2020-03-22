import feathersClient, { makeAuthPlugin } from "@/store/feathers/client";
import { models } from "@/store/feathers/client";

export default makeAuthPlugin(
  {
    serverAlias: "api",
    userService: "users",
    state: { },
    getters: { },
    mutations: { },
    actions: { }
  }
);