import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import\
// @ts-ignore
const pages = import.meta.glob("/src/pages/*.vue");
const routes = Object.keys(pages).map((path) => {
  const name = path
    .split("/")
    ?.pop()
    ?.replace(/\.\w+$/, "")
    .toLowerCase();
  return {
    path: name === "home" ? "/" : "/" + name,
    component: pages[path], // () => import('./pages/*.vue')
  };
});

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    // @ts-ignore
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    // @ts-ignore
    routes,
  });
}
