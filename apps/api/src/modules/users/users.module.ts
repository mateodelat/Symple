import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'
import { UserSchema, User } from './entities/user.entity'

@Module({
  imports: [MongooseModule.forFeature(
    [
      {
        name: User.name,
        schema: UserSchema
      }
    ]
  )],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
