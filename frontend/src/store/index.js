import { createStore } from "vuex";
import user from "./modules/user";
import chats from "./modules/chats";
import messages from "./modules/messages";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    chats,
    messages,
  },
});
