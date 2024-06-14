import { Module } from '@nestjs/common';
import {
  Application,
  ApplicationBase,
  ContactRepositoryBase,
} from '../application';
import { AggregateRoot, AggregateRootBase } from '../domain/aggregates';
import { ContactRepository } from './contact.repository';
import { PruebaController } from './prueba.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [PruebaController],
  providers: [
    AppService,
    ContactRepository,
    {
      provide: ContactRepositoryBase,
      useClass: ContactRepository,
    },
    {
      provide: AggregateRootBase,
      useClass: AggregateRoot,
    },
    {
      provide: ApplicationBase,
      useFactory: (
        aggregateRoot: AggregateRoot,
        repository: ContactRepository,
      ) => new Application(aggregateRoot, repository),
      inject: [AggregateRootBase, ContactRepositoryBase],
    },
  ],
})
export class AppModule {}
