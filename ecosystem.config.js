module.exports = {
  apps: [
    {
      name: "testv1", // PM2 process adı
      script: "npm", // "npm start" çalıştır
      args: "start",
      interpreter: "/bin/bash", // nvm ortamı için bash shell
      env: {
        NVM_DIR: "/root/.nvm", // nvm ortamı tanımlanıyor
        PATH: "/root/.nvm/versions/node/v22.17.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        NODE_ENV: "production",
      },
    },
  ],
};
