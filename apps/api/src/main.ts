import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import config from "./config";

async function bootstrap(): Promise<void> {
  const appConfig: ConfigType<typeof config> = config();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix("/api");

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Symple API")
    .setDescription("Documentación para API de Symple")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);
  await app.listen(appConfig.port ?? 3001);
}
void bootstrap();
