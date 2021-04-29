import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Message from '../views/Message.vue';
import Edit from '../views/Edit.vue';
import Profile from '../views/Profile.vue';
import store from '../store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    beforeEnter: (to, from, next) => { //ログアウト状態だとメッセージ画面に飛べない処理
      if (!store.state.auth.singerState && !store.state.auth.mixerState) {
        next('/');
        store.commit("common/setLogInLabel", "ログイン"); //新規登録かログインかを変更
        store.dispatch("modal/setModal", "LogInForm"); //モーダル開く
      } else {
        next();
      }
    }
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    beforeEnter: (to, from, next) => { //ログアウト状態だと編集画面に飛べない処理
      if (!store.state.auth.singerState && !store.state.auth.mixerState) {
        next('/');
        store.commit("common/setLogInLabel", "ログイン");//新規登録かログインかを変更
        store.dispatch("modal/setModal", "LogInForm"); //モーダル開く
      } else {
        next();
      }
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
