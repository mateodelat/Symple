import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EnterprisesController } from './controllers/enterprises.controller'
import { EnterprisesService } from './services/enterprises.service'
import { EnterpriseSchema, Enterprise } from './entities/enterprise.entity'

@Module({
  imports: [MongooseModule.forFeature(
    [
      {
        name: Enterprise.name,
        schema: EnterpriseSchema
      }
    ]
  )],
  controllers: [EnterprisesController],
  providers: [EnterprisesService],
  exports: [EnterprisesService]
})
export class EnterprisesModule {}
