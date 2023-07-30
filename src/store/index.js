import { createStore } from "vuex";

export default createStore({
  state: {
    userData:{},
      searchResult:[],
      search_key:"",
  },
  getters: {
    getUserData: (state) => state.userData,
    getSearchResult: (state) => state.searchResult,
    getSearchKey: (state) => state.search_key,
  },
  mutations: {
    setSearchResult(state, result) {
      state.searchResult = result;
    },
    setSearchKey(state, search_key){
      state.search_key = search_key;
    },
    setUserData(state, data){
      state.userData = data
    }
  },
  actions: {
    saveSearchResult({ commit }, result) {
      commit('setSearchResult', result);
    },
    saveSearchKey({ commit }, search_key) {
      commit('setSearchKey', search_key);
    },
    saveUserData({ commit }, data){
      commit('setUserData', data);
    }
  },
  modules: {},
});
