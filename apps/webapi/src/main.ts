/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from './app/app.module';
import { WebApiConfig } from '@webapi/common';

async function bootstrap() {
    // Catch uncaughtException
    process.on('uncaughtException', (err) => {
        Logger.error('There was an uncaught error', err);
        process.exit(1); //mandatory (as per the Node.js docs)
    });

    // NestJs app
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        // Buffer logs to be replay when the winston logger is assigned to the app
        bufferLogs: true,
    });

    // Configuration (mostly from environment variables)
    const configService = app.get(ConfigService<WebApiConfig>);

    // https://docs.nestjs.com/faq/global-prefix#global-prefix
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    // https://docs.nestjs.com/techniques/versioning
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    // https://docs.nestjs.com/openapi/introduction
    const swaggerConfig = new DocumentBuilder()
        .setTitle('API')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig, {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
            methodKey,
        extraModels: [],
    });

    writeFileSync(`${__dirname}/swagger.json`, JSON.stringify(document));

    SwaggerModule.setup('api/swagger', app, document);

    // Starting to listen...
    const port = configService.get('port');
    await app.listen(port);

    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
}

bootstrap();
