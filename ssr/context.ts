import { createContext, useContext } from "react";
import { Page } from "./helpers/types";

type SingleRoute = {
  path: string;
  exact?: boolean;
  getComponent: () => any;
};

export const routes: SingleRoute[] = [
  {
    path: "/",
    exact: true,
    getComponent: () => import("../src/pages/index"),
  },
  {
    path: "/test",
    getComponent: () => import("../src/pages/test"),
  },
];

type ContextType = {
  activePage: Page;
  setActivePage: (page: Page) => void;
};

export const Context = createContext<ContextType>({} as any);

const getServerData = async (to) => {
  let res = await fetch(`/data/${to}`);
  return await res.json();
};

export const useSsrContext = () => {
  let { setActivePage } = useContext(Context);

  return {
    navigate: async (to: string) => {
      let [props, { default: component }] = await Promise.all([
        getServerData(to),
        routes.find((route) => route.path === to).getComponent(),
      ]);

      setActivePage({ path: to, component, props });
      history.pushState(null, "", to);
    },
  };
};
