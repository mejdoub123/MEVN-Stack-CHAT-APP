import router from "@/router";
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

//Define Toaster
const toaster = createToaster({});

const state = {
  loading: false,
};

const getters = { loadingStatus: (state) => state.loading };

const actions = {
  async registerUser({ commit }, user) {
    commit("setLoading", true);
    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      toaster.warning(`Please Enter all the feilds`, { position: "bottom" });
      commit("setLoading", false);
      return;
    }
    if (user.password !== user.confirmPassword) {
      toaster.error(`Password Do Not match`, { position: "bottom" });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const name = user.name;
      const email = user.email;
      const password = user.password;
      const pic = user.pic;
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      commit("setLoginStatus", true, { root: true });
      commit("setCurrentUser", data, { root: true });
      toaster.success(`Registration success`, { position: "bottom" });
      localStorage.setItem("userInfo", JSON.stringify(data));
      router.push("/chat");
      commit("setLoading", false);
    } catch (err) {
      toaster.error(`${err.response.data.message}`, { position: "bottom" });
      commit("setLoading", false);
    }
  },
  async loginUser({ commit }, user) {
    commit("setLoading", true);
    if (!user.email || !user.password) {
      toaster.warning(`Please Enter all the feilds`, { position: "bottom" });
      commit("setLoading", false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const email = user.email;
      const password = user.password;
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      commit("setLoginStatus", true, { root: true });
      commit("setCurrentUser", JSON.parse(JSON.stringify(data)), {
        root: true,
      });
      toaster.success(`Login success`, { position: "bottom" });
      localStorage.setItem("userInfo", JSON.stringify(data));
      router.push("/chat");
      commit("setLoading", false);
    } catch (err) {
      toaster.error(`${err.response.data.message}`, { position: "bottom" });
      commit("setLoading", false);
    }
  },
  logoutUser({ commit }) {
    localStorage.removeItem("userInfo");

    commit("setCurrentUser", {}, { root: true });
    commit("setCurrentSelectedChat", {}, { root: true });
    commit("setSearchResults", [], { root: true });
    commit("setAllChatsUser", [], { root: true });

    commit("setLoginStatus", false, { root: true });
    router.push("/");
  },
};
const mutations = {
  setLoading: (state, loading) => (state.loading = loading),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
