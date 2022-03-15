import axios from "axios";

import { createToaster } from "@meforma/vue-toaster";
import io from "socket.io-client";
//Define Toaster
const toaster = createToaster({});

const state = {
  allMessages: [],
  notifications: [],
  socket: null,
  statusIO: false,
  typing: false,
  isTyping: false,
};

const getters = {
  allMessagesForTheSelectedChat: (state) => state.allMessages,
  theSocket: (state) => state.socket,
  theStatusIO: (state) => state.statusIO,
  typingStatus: (state) => state.typing,
  isTypingStatus: (state) => state.isTyping,
  allNotifications: (state) => state.notifications,
};

const actions = {
  //Fetch All The Messages
  async fetchAllMessages({ commit, rootState }) {
    if (!rootState.chats.selectedChat) {
      return;
    }
    try {
      commit("setLoading", true);
      const token = rootState.chats.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/api/message/${rootState.chats.selectedChat._id}`,
        config
      );
      commit("setAllMessagesForTheSelectedChat", data);
      commit("setLoading", false);
      // state.socket.emit("join chat", rootState.chats.selectedChat._id);
    } catch (err) {
      toaster.warning(`${err.message}`, { position: "bottom" });
      commit("setLoading", false);
    }
  },
  async sendMessage({ commit, dispatch, rootState }, params) {
    if (!params.msg) {
      return;
    }
    state.socket.emit("stop typing", rootState.chats.selectedChat._id);
    try {
      commit("setLoading", true);
      const token = rootState.chats.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/message",
        { msg: params.msg, chatId: params.chatId },
        config
      );

      // TODO: test
      state.socket.emit("new message", data);
      dispatch("fetchAllMessages");
      dispatch("getAllChats");
      commit("setLoading", false);
    } catch (err) {
      toaster.warning(`${err.message}`, { position: "bottom" });
      commit("setLoading", false);
    }
  },
  initialSocket({ commit, rootState }) {
    const socketIO = io("http://localhost:8080/");
    socketIO.emit("setup", rootState.chats.user);
    socketIO.on("connected", () => commit("setTheStatusIO", true));
    commit("setTheSocket", socketIO);
  },
  updateWhenMessageRecieved({ commit, rootState, dispatch }) {
    state.socket.on("message recieved", (newMessage) => {
      console.log(newMessage);
      if (
        !rootState.chats.selectedChat ||
        rootState.chats.selectedChat._id !== newMessage.chat._id
      ) {
        if (!state.notifications.includes(newMessage)) {
          commit("setNotification", newMessage);
          //notification
        }
        return;
      } else {
        dispatch("fetchAllMessages");
      }
    });
  },
  joinRoom({ rootState }) {
    state.socket.emit("join chat", rootState.chats.selectedChat._id);
  },

  typingIndicator({ commit, rootState }, text) {
    console.log("typing " + text);

    if (!state.statusIO) return;

    if (!state.typing) {
      commit("setTypingStatus", true);

      state.socket.emit("typing", rootState.chats.selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timeLength = 2000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timeLength && state.typing) {
        state.socket.emit("stop typing", rootState.chats.selectedChat._id);
        commit("setTypingStatus", false);
      }
    }, timeLength);
  },
  theOtherStatus({ commit, rootState }) {
    state.socket.on("typing", (room) => {
      if (rootState.chats.selectedChat._id === room) {
        commit("setIsTypingStatus", true);
      }
    });
    state.socket.on("stop typing", (room) => {
      if (rootState.chats.selectedChat._id === room) {
        commit("setIsTypingStatus", false);
      }
    });
  },
};

const mutations = {
  setAllMessagesForTheSelectedChat: (state, allMessages1Chat) =>
    (state.allMessages = allMessages1Chat),
  setTheSocket: (state, socket) => (state.socket = socket),
  setTypingStatus: (state, typingStatus) => (state.typing = typingStatus),
  setIsTypingStatus: (state, isTypingStatus) =>
    (state.isTyping = isTypingStatus),
  setTheStatusIO: (state, statusIo) => (state.statusIO = statusIo),
  setNotification: (state, notification) =>
    state.notifications.unshift(notification),
  deleteNotification: (state, notification) =>
    (state.notifications = state.notifications.filter((n) => {
      n !== notification;
    })),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
