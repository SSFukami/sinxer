import Vuex from 'vuex';
import { common } from './common/index';
import { modal } from './modal/index';

import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
  modules: {
    common,
    modal,
  },
  plugins: [
    createPersistedState()
  ]
});