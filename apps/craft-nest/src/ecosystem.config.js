// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'craft-nest-api',
    script: 'dist/apps/craft-nest/src/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    cwd: '/home/jeffrey/repos/craft-fushion',
    env_production: {
      NODE_ENV: 'production',
      PM2_HOME: '/home/jeffrey/.pm2',
      PORT: 443,
      HOST: 'jeffreysanford.us',
      KEY_PATH: '/etc/letsencrypt/live/jeffreysanford.us/privkey.pem',
      CERT_PATH: '/etc/letsencrypt/live/jeffreysanford.us/fullchain.pem'
    },
    error_file: '/home/jeffrey/logs/craft-nest/error.log',
    out_file: '/home/jeffrey/logs/craft-nest/out.log',
    merge_logs: true,
    time: true,
    max_memory_restart: '1G',
    watch: false
  }]
};
