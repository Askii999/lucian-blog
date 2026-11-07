import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  accountId: "1306a8eb42d1dacf7d4bf0656a486be2",
  worker: defineWorker({
    name: "lucian-blog",
    domains: ["lucian.me.uk", "www.lucian.me.uk"],
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-07",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
});
