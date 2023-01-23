import todo from "./components/todo";
import about from "./components/about";
import login from "./components/login";

export default [
  { path: "/", component: about },
  { path: "/todo", name: "Home", component: todo },
  { path: "/login", name: "Login", component: login }
];
