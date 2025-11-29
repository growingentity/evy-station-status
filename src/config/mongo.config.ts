import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  config: ConfigService,
): Promise<MongooseModuleOptions> => {
  const database = `${config.get<string>('APP_NAME')}${config.get<string>('NODE_ENV') === "production" ? "" : "-dev"}`;
  const uri = `mongodb://${config.get<string>('MONGO_USER')}:${config.get<string>('MONGO_PASSWORD')}@${config.get<string>('MONGO_HOST')}:${config.get<string>('MONGO_PORT')}/${database}`;

  return {
    uri,
    ssl: true,
    tlsCAFile: config.get<string>('MONGO_CACERT'),
  };
};
