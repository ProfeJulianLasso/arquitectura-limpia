import { Module } from '@nestjs/common';
import { Application, ContactRepositoryBase } from '../Application';
import { AggregateRoot } from '../Domain/Aggregates';
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
      provide: AggregateRoot,
      useClass: AggregateRoot,
    },
    {
      provide: Application,
      useFactory: (
        aggregateRoot: AggregateRoot,
        repository: ContactRepository,
      ) => new Application(aggregateRoot, repository),
      inject: [AggregateRoot, ContactRepository],
    },
  ],
})
export class AppModule {}
