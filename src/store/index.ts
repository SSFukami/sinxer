import Vuex from 'vuex';
import { common } from './common/index';
import { modal } from './modal/index';
import { auth } from './auth/index';

import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({ //storeをmoduleに分割
  modules: {
    common,
    modal,
    auth
  },
  plugins: [
    createPersistedState()
  ]
});