module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/graphql": {
        target: "http://localhost:4000",
        secure: false,
      },
    },
  },
};
