import { AggregateRoot } from '../Domain/Aggregates';
import { ErrorResponse, Result } from '../Shared';
import { IApplication } from './Interfaces';
import {
  ContactApplicationRequest,
  ContactApplicationResponse,
  CrateContactUseCase,
  UpdateContactUseCase,
} from './UseCases';
import { ContactRepositoryBase } from './repositories';

export class Application implements IApplication {
  private aggregateRoot: AggregateRoot;
  private repository: ContactRepositoryBase;

  constructor(aggregateRoot: AggregateRoot, repository: ContactRepositoryBase) {
    this.aggregateRoot = aggregateRoot;
    this.repository = repository;
  }

  createContact(
    data: ContactApplicationRequest,
  ): Result<ContactApplicationResponse | ErrorResponse> {
    const useCase = new CrateContactUseCase(
      this.aggregateRoot,
      this.repository,
    );
    return useCase.execute(data);
  }

  updateContact(
    data: ContactApplicationRequest,
  ): Result<ContactApplicationResponse | ErrorResponse> {
    const useCase = new UpdateContactUseCase(
      this.aggregateRoot,
      this.repository,
    );
    return useCase.execute(data);
  }
}
