import { RequestHandler } from "express-serve-static-core";

import { ViteDevServer } from "vite";
import { pageLoader } from "./pageLoader";

type Props = {
  vite: ViteDevServer;
};

export const serverRenderRoute =
  ({ vite }: Props): RequestHandler =>
  async (req, res) => {
    const url = req.originalUrl;
    try {
      let { template, render } = await pageLoader({
        url,
        vite,
      });

      const [appHtml, preloadLinks] = await render(url, {});

      // 5. Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml);

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // If an error is caught, let vite fix the stracktrace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e as any);
      console.error(e);
      res.status(500).end((e as any).message);
    }
  };
