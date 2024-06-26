import {
  AggregateRoot,
  ContactDomainRequest,
  ContactDomainResponse,
  IAggregateRoot,
} from '../../Domain/Aggregates';
import { ErrorResponse, Result } from '../../Shared';
import { IUseCase } from '../Interfaces';
import { ContactRepositoryBase } from '../repositories';
import { ContactApplicationRequest, ContactApplicationResponse } from './Dto';

export class CrateContactUseCase
  implements
    IUseCase<
      ContactApplicationRequest,
      Result<ContactApplicationResponse | ErrorResponse>
    >
{
  private aggregateRoot: IAggregateRoot;
  private repository: ContactRepositoryBase;

  constructor(aggregateRoot: AggregateRoot, repository: ContactRepositoryBase) {
    this.aggregateRoot = aggregateRoot;
    this.repository = repository;
  }

  execute(
    request: ContactApplicationRequest,
  ): Result<ContactApplicationResponse | ErrorResponse> {
    const data = this.mapToDomain(request);
    const resultDomain = this.aggregateRoot.createContact(data);

    if (resultDomain.isFailure && resultDomain.error instanceof ErrorResponse) {
      return Result.fail(resultDomain.error);
    }

    if (
      resultDomain.isSuccess &&
      resultDomain.value instanceof ContactDomainResponse
    ) {
      const result = this.persist(resultDomain.value);
      if (result.isFailure) {
        return result;
      }

      if (result.isSuccess) {
        return Result.ok(
          new ContactApplicationResponse({
            id: resultDomain.value.id,
            name: resultDomain.value.name,
            email: resultDomain.value.email,
          }),
        );
      }
    }
  }

  private mapToDomain(
    request: ContactApplicationRequest,
  ): ContactDomainRequest {
    return new ContactDomainRequest({
      id: request.id,
      name: request.name,
      email: request.email,
    });
  }

  private persist(data: ContactDomainRequest): Result<ErrorResponse> {
    try {
      this.repository.create(data);
      return Result.ok();
    } catch (error) {
      return Result.fail(
        new ErrorResponse({
          message: 'Error on create contact',
          details: JSON.stringify(error),
        }),
      );
    }
  }
}
