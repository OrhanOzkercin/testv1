module.exports = {
  apps: [
    {
      name: "testv1", // PM2 uygulama ismi
      script: "node_modules/next/dist/bin/next", // next.js'in start komutu
      args: "start", // production start
      cwd: "/root/testv1", // working directory - projenin kök dizini
      interpreter: "/root/.nvm/versions/node/v22.17.0/bin/node", // nvm ile kurulu node yolu
      env: {
        NODE_ENV: "production", // production ortamı
        PATH: "/root/.nvm/versions/node/v22.17.0/bin:" + process.env.PATH, // doğru ortam path'i
      },
    },
  ],
};
