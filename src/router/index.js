import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import IndexView from "../views/IndexView.vue";
import ProfileView from "../views/ProfileView.vue";
import NotiView from "../views/NotiView.vue";
import FriendView from "../views/FriendView.vue";
import MessageView from "../views/MessageView.vue";
import CreatePostView from "../views/CreatePostView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },

  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/index",
    name: "index",
    component: IndexView,
  },
  {
    path: "/friend",
    name: "friend",
    component: FriendView,
  },
  {
    path: "/noti",
    name: "noti",
    component: NotiView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/message",
    name: "message",
    component: MessageView,
  },
  {
    path: "/post",
    name: "post",
    component: CreatePostView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
