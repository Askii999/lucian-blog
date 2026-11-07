import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import {defineConfig} from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
export default defineConfig({
  css:{postcss:{plugins:[tailwindcss()]}},
  plugins:[
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
  server:{host:'127.0.0.1',port:3000}
});
