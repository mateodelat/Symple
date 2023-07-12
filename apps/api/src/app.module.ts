import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnterprisesController } from './controllers/enterprises/enterprises.controller'
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [],
  controllers: [AppController, EnterprisesController, UsersController],
  providers: [AppService]
})
export class AppModule {}
