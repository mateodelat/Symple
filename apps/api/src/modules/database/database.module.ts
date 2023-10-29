import { Module, Global } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import config from "@/config";

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { cluster, name, password, user } = configService.database;
        const connectionString = `mongodb+srv://${user ?? ""}:${
          password ?? ""
        }@${cluster ?? ""}/${name ?? ""}`;
        return {
          uri: connectionString,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
