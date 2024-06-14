import { ErrorResponse, Result } from '../../../shared';
import { ContactDomainRequest, ContactDomainResponse } from '../dto';

export abstract class AggregateRootBase {
  abstract createContact(
    request: ContactDomainRequest,
  ): Result<ContactDomainResponse | ErrorResponse>;
  abstract updateContact(
    request: ContactDomainRequest,
  ): Result<ContactDomainResponse | ErrorResponse>;
}
