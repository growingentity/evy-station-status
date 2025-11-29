import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StationStatusService } from './station-status.service';
import { LocationSchema } from './location.schema';
import { NotificationService } from 'src/notification-service/notification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OCPILocations', schema: LocationSchema, collection: 'ocpilocations' }
    ]),
  ],
  providers: [StationStatusService, NotificationService],
  exports: [StationStatusService],
})
export class StationStatusModule {}
