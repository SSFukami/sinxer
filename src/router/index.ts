import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Message from '../views/Message.vue';
import Edit from '../views/Edit.vue';
import Profile from '../views/Profile.vue';
import store from '../store';
import { profileDataType } from '@/store/exchange/models';

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
        alert("メッセージ機能はログインしないと使用できません。");
        store.dispatch("common/closeAside"); //サイドバーを閉じる
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
        alert("編集機能はログインしないと使用できません。");
        store.dispatch("common/closeAside"); //サイドバーを閉じる
        store.commit("common/setLogInLabel", "ログイン"); //新規登録かログインかを変更
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
router.beforeResolve((to, from, next) => {
  //グローバルなルートの変更時
  if (to.name === 'Edit') { //編集画面に入るときはバリデート不必要
    next();
  } else if (from.name === 'Edit' || from.name === undefined) { //編集画面から離れる時やURLを叩いてサイトを開いた時
    const selfProfile = store.state.exchange.selfProfileData;
    let hasEmpty: boolean = false; //プロフィール情報に空があるならtrue
    const profileItemList = Object.values(selfProfile); //プロフィールの値のリスト
    for (let i in profileItemList) {
      hasEmpty = profileItemList[i] === "" || hasEmpty ? true : false; //どれか一つでも値が空なら真偽値をtrueに
    }

    if (hasEmpty) {
      alert("すべての項目を埋めて、保存する必要があります");
      store.dispatch("common/closeAside"); //サイドバーを閉じる
      next('/edit'); //空白があるなら編集画面へ
    } else {
      next(); //空白がないならそのまま
    }
  } else {
    next();
  }
});

export default router;
