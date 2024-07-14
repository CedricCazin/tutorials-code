import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum Environment {
    Development = 'development',
    Production = 'production',
}

export class EnvironmentVariablesValidation {
    @IsOptional()
    @IsEnum(Environment)
    NODE_ENV?: Environment;

    @IsOptional()
    @IsNumber()
    PORT?: number;

    @IsOptional()
    @IsString()
    HOST?: string;
}
