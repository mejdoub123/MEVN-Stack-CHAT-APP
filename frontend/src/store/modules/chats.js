import axios from "axios";

import { createToaster } from "@meforma/vue-toaster";

//Define Toaster
const toaster = createToaster({});

const state = {
  login: false,

  user: {},
  searchResults: [],
  selectedChat: {},
  allChats: [],
};
const getters = {
  loginStatus: (state) => state.login,
  currentUser: (state) => state.user,
  lastSearchResults: (state) => state.searchResults,
  currentSelectedChat: (state) => state.selectedChat,
  allUserChats: (state) => state.allChats,
};
const actions = {
  //Search User
  async handleSearch({ commit }, searchInput) {
    if (!searchInput) {
      toaster.warning(`Please Enter something!`, { position: "top-left" });
      return;
    }
    try {
      commit("setLoading", true);
      const token = state.user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.get(
        `/api/user?search=${searchInput}`,
        config
      );

      commit("setLoading", false);
      commit("setSearchResults", data);
    } catch (err) {
      toaster.warning(`${err.response.data.message}`, { position: "top-left" });
      commit("setLoading", false);
    }
  },
  // Create Or Access a Chat conversation Or Group
  async accessChat({ commit, dispatch }, userId) {
    try {
      commit("setLoading", true);
      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      commit("setLoading", false);
      commit("setCurrentSelectedChat", data);
      dispatch("fetchAllMessages");
      if (!state.allChats.find((chat) => chat._id === data._id)) {
        dispatch("getAllChats");
      }
    } catch (err) {
      toaster.warning(`${err.message}`, { position: "bottom" });
      commit("setLoading", false);
    }
  },
  //Fetch All Chats for the Current User
  async getAllChats({ commit }) {
    try {
      commit("setLoading", true);
      const token = state.user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get("/api/chat", config);

      commit("setLoading", false);
      commit("setAllChatsUser", data);
    } catch (err) {
      toaster.warning(`${err.message}`, { position: "bottom" });
      commit("setLoading", false);
    }
  },
  //Create Group Chat
  async createGroupChat({ commit, dispatch }, params) {
    if (!params.groupName || !params.usersToAdd) {
      toaster.warning(`Please Enter all the feilds`, { position: "bottom" });
      return;
    }

    try {
      commit("setLoading", true);
      const token = state.user.token;
      const groupName = params.groupName;
      const usersToAdd = params.usersToAdd;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupName,
          users: JSON.stringify(usersToAdd.map((u) => u._id)),
        },
        config
      );
      commit("setLoading", false);
      commit("setCurrentSelectedChat", data);
      await dispatch("getAllChats");
      toaster.success(`New Group Chat Created!`, { position: "bottom" });
    } catch (err) {
      toaster.warning(`${err.message}`, { position: "bottom" });
      commit("setLoading", false);
    }
  },
  //Remove User from Chat Group
  async removeUserFromGroup({ commit, dispatch }, params) {
    try {
      commit("setLoading", true);
      const token = state.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupremove",
        { userId: params.userId, chatId: params.chatId },
        config
      );
      commit("setLoading", false);
      if (params.userId === state.user._id) {
        commit("setCurrentSelectedChat", {});
      } else {
        commit("setCurrentSelectedChat", data);
      }

      await dispatch("getAllChats");
    } catch (err) {
      toaster.warning(`${err.message}`, { position: "bottom" });
      commit("setLoading", false);
    }
  },
  //Add User to Group
  async addUserToGroup({ commit }, params) {
    try {
      commit("setLoading", true);
      const token = state.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupadd",
        { userId: params.userId, chatId: params.chatId },
        config
      );
      commit("setLoading", false);
      commit("setCurrentSelectedChat", data);
    } catch (err) {
      toaster.warning(`${err.message}`, { position: "bottom" });
      commit("setLoading", false);
    }
  },
  //Rename Group Chat
  async renameGroupChat({ commit, dispatch }, params) {
    if (!params.chatName) {
      toaster.warning(`Please Enter a Chat Name`, { position: "bottom" });
      return;
    }
    try {
      commit("setLoading", true);
      const token = state.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: params.chatId,
          chatName: params.chatName,
        },
        config
      );
      console.log(data);
      commit("setLoading", false);
      commit("setCurrentSelectedChat", data);
      await dispatch("getAllChats");
      toaster.success(`Group name Updated successfully`, {
        position: "bottom",
      });
    } catch (err) {
      toaster.warning(`${err.message}`, { position: "bottom" });
      commit("setLoading", false);
    }
  },
};
const mutations = {
  setLoginStatus: (state, loginStatus) => (state.login = loginStatus),

  setCurrentUser: (state, currentUser) => (state.user = currentUser),

  setSearchResults: (state, lastSearchResults) =>
    (state.searchResults = lastSearchResults),

  setCurrentSelectedChat: (state, currentSelectedChat) =>
    (state.selectedChat = currentSelectedChat),

  setAllChatsUser: (state, allUserChats) => (state.allChats = allUserChats),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
