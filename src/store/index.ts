import Vuex from 'vuex';
import { modal } from './modal/index';

import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
  modules: {
    modal,
  },
  plugins: [
    createPersistedState()
  ]
});