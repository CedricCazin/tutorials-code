import { readFileSync } from 'fs';
import { WebApiConfig } from './app-config.interface';

export const LoadConfig = (): WebApiConfig => {
    let version = '0.0.0';
    try {
        version = readFileSync('version.txt').toString();
    } catch (ex) {
        console.log('Could not read version file. Using default version 0.0.0');
    }

    const config: WebApiConfig = {
        isProduction: process.env['NODE_ENV'] === 'production',
        host: process.env['HOST'] ?? 'localhost',
        port: parseInt(process.env['PORT'] ?? '3000', 10),
        productVersion: version,
    };

    return config;
};
