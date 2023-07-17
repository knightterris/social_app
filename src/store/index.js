import { createStore } from "vuex";

export default createStore({
  state: {
    userData: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
  },
  getters: {
    getUserData: (state) => state.userData,
  },
  mutations: {},
  actions: {},
  modules: {},
});
