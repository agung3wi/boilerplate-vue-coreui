import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

const store = new Vuex.Store({
  state: {
    tasks: [],
    token: null,
    isLogeddin: false,
    isLoading: false
  },
  mutations: {
    set(state, [variable, value]) {
      state[variable] = value
    },
    setSearchResults(state, payload) {
      state.searchResults = payload;
    }
  },
  actions: {

  },
  getters: {
    get: (state) => (key) => {
      return state[key];
    },
    hasPermission: (state) => (id) => {
      return state.tasks.indexOf(id) > -1
    },
    notif: state => {
      return state.notif;
    },
  },
  plugins: [vuexLocal.plugin]
});

export default store;
