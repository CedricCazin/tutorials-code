import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvironmentVariablesValidation } from './env-config.interface';

// ----------------------------------------------

export function ValidateEnvironmentVariables(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(
        EnvironmentVariablesValidation,
        config,
        {
            enableImplicitConversion: true,
        }
    );

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: true,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}

// ----------------------------------------------
