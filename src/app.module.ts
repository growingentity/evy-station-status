import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './config/mongo.config';
import { StationStatusModule } from './station-status/station-status.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationServiceModule } from './notification-service/notification.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    StationStatusModule,
    NotificationServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
