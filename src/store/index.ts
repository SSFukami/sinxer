import Vuex from 'vuex';
import { auth } from './auth/index';
import { common } from './common/index';
import { exchange } from './exchange/index';
import { modal } from './modal/index';
import { trimming } from './trimming/index';

import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({ //storeをmoduleに分割
  modules: {
    auth,
    common,
    exchange,
    modal,
    trimming,
  },
  plugins: [
    createPersistedState()
  ]
});