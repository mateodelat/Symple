import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnterprisesController } from './controllers/enterprises/enterprises.controller'
import { EnterprisesService } from './services/enterprises/enterprises.service'

@Module({
  imports: [],
  controllers: [AppController, EnterprisesController],
  providers: [AppService, EnterprisesService]
})
export class AppModule {}
