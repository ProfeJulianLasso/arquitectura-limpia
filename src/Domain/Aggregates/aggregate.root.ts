import { Result, ErrorResponse } from '../../Shared';
import { ContactDomainRequest, ContactDomainResponse } from './Dto';
import { IAggregateRoot } from './Interfaces';
import { ContactAggregate } from './contact.aggregate';

export class AggregateRoot implements IAggregateRoot {
  public readonly contactAggregate: ContactAggregate;

  constructor() {
    this.contactAggregate = new ContactAggregate();
  }

  public createContact(
    request: ContactDomainRequest,
  ): Result<ContactDomainResponse | ErrorResponse> {
    return this.contactAggregate.create(request);
  }

  public updateContact(
    request: ContactDomainRequest,
  ): Result<ContactDomainResponse | ErrorResponse> {
    return this.contactAggregate.update(request);
  }
}
