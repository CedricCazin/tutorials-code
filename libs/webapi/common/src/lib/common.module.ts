import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { LoadConfig } from './configs/app-config';
import { ValidateEnvironmentVariables } from './configs/env-config';

@Global()
@Module({
    imports: [
        // ConfigModule needed by webapi and worker
        // https://docs.nestjs.com/techniques/configuration
        // https://dev.to/pitops/managing-multiple-environments-in-nestjs-71l
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [LoadConfig],
            validate: ValidateEnvironmentVariables,
            // https://docs.nestjs.com/techniques/configuration#schema-validation
            // validationSchema: Joi.object({
            //   NODE_ENV: Joi.string()
            //     .valid('development', 'production', 'test', 'provision')
            //     .default('development'),
            //   PORT: Joi.number().default(3000),
            // }),
        }),
    ],
    providers: [],
    exports: [ConfigModule],
})
export class CommonModule {}

@Global()
@Module({
    imports: [CommonModule],
    controllers: [],
})
export class CommonApiControllersModule {}
