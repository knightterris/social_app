const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  devServer: {
    proxy: {
      "/uploads": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
};
