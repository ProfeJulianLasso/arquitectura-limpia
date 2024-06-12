import { IAggregateRoot, ContactDomainRequest } from '../../Domain/Aggregates';
import { Result, ErrorResponse } from '../../Shared';
import { IUseCase } from '../Interfaces';
import { ContactApplicationRequest, ContactApplicationResponse } from './Dto';

export class CrateContactUseCase
  implements
    IUseCase<
      ContactApplicationRequest,
      Result<ContactApplicationResponse | ErrorResponse>
    >
{
  private aggregateRoot: IAggregateRoot;

  constructor(aggregateRoot: IAggregateRoot) {
    this.aggregateRoot = aggregateRoot;
  }

  execute(
    request: ContactApplicationRequest,
  ): Result<ContactApplicationResponse | ErrorResponse> {
    const data = this.mapToDomain(request);
    const result = this.aggregateRoot.createContact(data);

    if (result.isFailure && result.error instanceof ErrorResponse) {
      return Result.fail(result.error);
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
}
