const config =  require('./config/env');

const { database, username, password, dialect , host, redis_host, redis_port } = config

module.exports = {
  apps : [
    {
      name: 'mis-report',
      script: 'node ./dist/src/app.js',
      instances: '1',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        REDIS_HOST: redis_host || 'localhost',
        REDIS_PORT: redis_port || 6379,
        DB_HOST: host || '127.0.0.1',
        DB_NAME: database || 'report',
        DB_USER: username || 'root',
        DB_PASS: password || 'password',
        DB_DIALECT: dialect || 'mysql'
      }
    }
  ]
};