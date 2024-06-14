import { AggregateRootBase } from '../domain';
import { ErrorResponse, Result } from '../shared';
import { ApplicationBase } from './bases';
import { ContactRepositoryBase } from './repositories';
import {
  ContactApplicationRequest,
  ContactApplicationResponse,
  CrateContactUseCase,
  UpdateContactUseCase,
} from './use-cases';

export class Application extends ApplicationBase {
  private aggregateRoot: AggregateRootBase;
  private repository: ContactRepositoryBase;

  constructor(
    aggregateRoot: AggregateRootBase,
    repository: ContactRepositoryBase,
  ) {
    super();
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
