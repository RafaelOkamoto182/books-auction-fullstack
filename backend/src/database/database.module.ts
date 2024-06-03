import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DatabaseService } from './database.service';
import { ModuleRef } from '@nestjs/core';

const databasePoolFactory = async (configService: ConfigService) => {
    return new Pool({
        host: configService.get('POSTGRES_HOST'),
        user: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        port: configService.get('POSTGRES_PORT'),
    });
};

@Module({
    providers: [
        {
            provide: 'DATABASE_POOL',
            inject: [ConfigService],
            useFactory: databasePoolFactory
        },
        DatabaseService,
    ],
    exports: [DatabaseService],
})

export class DatabaseModule implements OnApplicationShutdown {

    private readonly logger = new Logger(DatabaseModule.name);

    constructor(private readonly moduleRef: ModuleRef) { }

    onApplicationShutdown(signal?: string): any {

        this.logger.log(`Shutting down on signal ${signal}`);
        const pool = this.moduleRef.get('DATABASE_POOL') as Pool;
        return pool.end();
    }
}