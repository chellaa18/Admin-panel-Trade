module.exports = {
    apps: [
        {
            name: 'BACKEND_SERVER',
            script: './app.js',
            watch: true,
            ignore_watch: ["node_modules", "node_modules/*", "logs", "logs/*", "api_files", "api_files/*", ".node-gyp", ".node-gyp/*", ".pm2", ".pm2/*", "public", "public/*", "TradingBot.json"],
            output: 'logs/out.log',
            error: 'logs/error.log',
            log: 'logs/combined.outerr.log',
            env_local: {
                NODE_ENV: 'local',
                PORT: 1234
            },
            env_development: {
                NODE_ENV: 'devel',
                PORT: 1234
            },
            env_production: {
                NODE_ENV: 'prod',
                PORT: 1234
            },
        }
    ]
};