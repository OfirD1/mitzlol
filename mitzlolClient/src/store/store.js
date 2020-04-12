import Vue from "vue";
import Vuex from "vuex";
import api from "../api/mitzlolim";

Vue.use(Vuex);

const state = {
  mitzlolim: [],
  total: -1,
  waiting: false,
};
const actions = {
  getMitzlolimAsync({ commit }, word) {
    commit("toggleWaiting");
    return new Promise(() => {
      api.getMitzlolim(word, res => {
        commit("toggleWaiting");
        commit("setMitzlolim", res.data);
      });
    });
  }
};
const mutations = {
  setMitzlolim(state, data) {
    state.mitzlolim = data.words;
    state.total = data.total;
  },
  toggleWaiting() {
    state.waiting = !state.waiting;
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
