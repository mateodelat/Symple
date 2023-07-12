import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  await app.listen(process.env.PORT ?? 3001)
}
void bootstrap()