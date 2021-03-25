import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Message from '../views/Message.vue';
import Edit from '../views/Edit.vue';
import Profile from '../views/Profile.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
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
