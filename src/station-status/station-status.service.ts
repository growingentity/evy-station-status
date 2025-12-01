import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TLocation } from './location.schema';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';
import { NotificationService } from 'src/notification-service/notification.service';

@Injectable()
export class StationStatusService {
  constructor(
    @InjectModel('OCPILocations')
    private locationModel: Model<TLocation>,
    private config: ConfigService,
    private notificationService: NotificationService
  ) {}

  isStationOnline(last_ping: string) {
    const stationOfflineThreshold =
      Number(this.config.get<string>('STATION_OFFLINE_THRESHOLD')) || 0;
    const lastOnlineDate = new Date(last_ping);
    const date = new Date();
    console.log(new Date(lastOnlineDate), "+++")
    console.log(new Date(date), "+++")
    if (lastOnlineDate.getTime() + stationOfflineThreshold < date.getTime()) {
      return false;
    }
    return true;
  }

  @Interval(60000)
  async checkAndNotify() {
    const locationIdsString = this.config.get<string>('STATION_IDS');
    const locationIds = locationIdsString
      ?.split(',')
      .map((id) => new Types.ObjectId(id.trim()));

    const locations = await this.locationModel.find({
      _id: { $in: locationIds },
    });

    for (let location of locations) {
      if (!this.isStationOnline(location.last_ping.toString())) {
        const message = encodeURIComponent(
          `\nname: ${location.name}\naddress: ${location.address}\nstatus: offline\nlast_ping: ${new Date(location.last_ping).toString()}`,
        );
        await this.notificationService.notifyByTelegram(message)
      }
    }
  }
}
