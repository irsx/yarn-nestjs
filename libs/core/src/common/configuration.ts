import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    port: parseInt(process.env.PORT, 10) || 8000,
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      type: process.env.DB_TYPE,
      database: process.env.DB_DATABASE,
    },
    secretKey: process.env.SECRET_KEY,
    discoveryUrl: process.env.DISCOVERY_URL,
    discoveryClientId: process.env.DISCOVERY_CLIENT_ID,
    discoveryClientSecret: process.env.DISCOVERY_CLIENT_SECRET,
    managerUsername: process.env.MANAGER_USERNAME,
    managerPassword: process.env.MANAGER_PASSWORD,
    managerUserId: process.env.MANAGER_USERID,
    iamUrl: process.env.IAM_URL,
    realmName: process.env.REALM_NAME,
  };
});
