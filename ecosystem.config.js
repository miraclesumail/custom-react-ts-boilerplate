module.exports = {
  apps: [
    {
      interpreter: "/usr/local/bin/ts-node",
      script: "./src/index.ts",
      cwd: "./",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      kill_timeout: 10000,
      name: "express_server",
      watch: ["server", "src"]
    }
  ]
};
