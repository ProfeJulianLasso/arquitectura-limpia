import { Result, ErrorResponse } from '../../../Shared';
import { ContactDomainRequest, ContactDomainResponse } from '../Dto';

export interface IAggregateRoot {
  createContact(
    request: ContactDomainRequest,
  ): Result<ContactDomainResponse | ErrorResponse>;
  updateContact(
    request: ContactDomainRequest,
  ): Result<ContactDomainResponse | ErrorResponse>;
}
