import { ErrorResponse, Result } from '../../shared';
import { ContactDomainRequest, ContactDomainResponse } from './dto';
import { ContactCreateHelper, ContactUpdateHelper } from './helpers';

export class ContactAggregate {
  public create(
    contact: ContactDomainRequest,
  ): Result<ContactDomainResponse | ErrorResponse> {
    const helper = new ContactCreateHelper();
    return helper.execute(contact);
  }

  public update(
    contact: ContactDomainRequest,
  ): Result<ContactDomainResponse | ErrorResponse> {
    const helper = new ContactUpdateHelper();
    return helper.execute(contact);
  }
}
