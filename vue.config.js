const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          // Suppress deprecation warnings originating from dependencies
          quietDeps: true,
        },
      },
      scss: {
        sassOptions: {
          // Suppress deprecation warnings originating from dependencies
          quietDeps: true,
        },
      },
    },
  },
})
