const vuePlugin = require("@vitejs/plugin-vue");

export default {
  plugins: [vuePlugin()],
  esbuild: {},
  build: {
    minify: false,
  },
};
