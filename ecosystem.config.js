module.exports = {
  apps: [
    {
      name: "testv1",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/root/testv1",
      interpreter: "/root/.nvm/versions/node/v22.17.0/bin/node",
      env: {
        NODE_ENV: "production",
        PATH: "/root/.nvm/versions/node/v22.17.0/bin:" + process.env.PATH,
      },
    },
  ],
};
