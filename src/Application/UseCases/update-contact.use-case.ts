import {
  ContactDomainRequest,
  ContactDomainResponse,
  IAggregateRoot,
} from '../../Domain/Aggregates';
import { ErrorResponse, Result } from '../../Shared';
import { IUseCase } from '../Interfaces';
import { ContactRepositoryBase } from '../repositories';
import { ContactApplicationRequest, ContactApplicationResponse } from './Dto';

export class UpdateContactUseCase
  implements
    IUseCase<
      ContactApplicationRequest,
      Result<ContactApplicationResponse | ErrorResponse>
    >
{
  private aggregateRoot: IAggregateRoot;
  private repository: ContactRepositoryBase;

  constructor(
    aggregateRoot: IAggregateRoot,
    repository: ContactRepositoryBase,
  ) {
    this.aggregateRoot = aggregateRoot;
    this.repository = repository;
  }

  execute(
    request: ContactApplicationRequest,
  ): Result<ContactApplicationResponse | ErrorResponse> {
    const data = this.mapToDomain(request);
    const resultDomain = this.aggregateRoot.updateContact(data);

    if (resultDomain.isFailure) {
      return resultDomain;
    }

    if (
      resultDomain.isSuccess &&
      resultDomain.value instanceof ContactDomainRequest
    ) {
      const result = this.persist(resultDomain.value);
      if (result.isFailure) {
        return result;
      }

      if (result.isSuccess) {
        const finalResult = this.mapToInfrastructure(resultDomain.value);
        return Result.ok(finalResult);
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
      this.repository.update(data);
      return Result.ok();
    } catch (error) {
      return Result.fail(
        new ErrorResponse({
          message: 'Error on update contact',
          details: JSON.stringify(error),
        }),
      );
    }
  }

  private mapToInfrastructure(
    data: ContactDomainResponse,
  ): ContactApplicationResponse {
    return new ContactApplicationResponse({
      id: data.id,
      name: data.name,
      email: data.email,
    });
  }
}
