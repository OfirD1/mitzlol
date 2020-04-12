module.exports = {
  baseUrl: "/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // mitzlolServer port
        changeOrigin: true
      }
    }
  }
};
