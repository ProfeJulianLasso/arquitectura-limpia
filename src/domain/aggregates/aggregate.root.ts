import { ErrorResponse, Result } from '../../shared';
import { AggregateRootBase } from './bases';
import { ContactAggregate } from './contact.aggregate';
import { ContactDomainRequest, ContactDomainResponse } from './dto';

export class AggregateRoot extends AggregateRootBase {
  public readonly contactAggregate: ContactAggregate;

  constructor() {
    super();
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
