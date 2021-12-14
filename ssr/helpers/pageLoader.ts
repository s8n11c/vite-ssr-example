import fs from "fs";
import path from "path";
import { ViteDevServer } from "vite";

type Props = {
  url: string;
  vite: ViteDevServer;
};

export const pageLoader = async ({ url, vite }: Props): Promise<any> => {
  // 1. Read index.html
  let template = fs.readFileSync(
    path.resolve(process.cwd(), "index.html"),
    "utf-8"
  );

  // 2. Apply vite HTML transforms. This injects the vite HMR client, and
  //    also applies HTML transforms from Vite plugins, e.g. global preambles
  //    from @vitejs/plugin-react-refresh
  template = await vite.transformIndexHtml(url, template);
  // 3. Load the server entry. vite.ssrLoadModule automatically transforms
  //    your ESM source code to be usable in Node.js! There is no bundling
  //    required, and provides efficient invalidation similar to HMR.

  const render = (await vite.ssrLoadModule("/ssr/entry.ts")).render;

  return { template, render };
};
