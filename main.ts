import App from "./ssr/App.vue";
import "./src/assets/css/tailwind.css";
import { createSSRApp, VueElement } from "vue";
import { createRouter } from "./ssr/router";

// inject components
const components: { [path: string]: { default: App.Component } } =
  // @ts-ignore
  import.meta.globEager("./src/components/*.vue");

function registerComponents(app: App.App<Element>) {
  Object.entries(components).forEach(([path, definition]) => {
    // Get name of component, based on filename
    // "./components/Fruits.vue" will become "Fruits"
    const componentName = path
      .split("/")
      ?.pop()
      ?.replace(/\.\w+$/, "");
    if (!componentName) throw new Error("Error Getting Component Name");
    // Register component on this Vue instance
    app.component(componentName, definition.default);
  });
}

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App as unknown as VueElement);
  const router = createRouter();
  app.use(router);
  registerComponents(app);
  return { app, router };
}
