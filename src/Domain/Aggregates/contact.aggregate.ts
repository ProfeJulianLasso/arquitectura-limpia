import { Result, ErrorResponse } from '../../Shared';
import { ContactDomainRequest, ContactDomainResponse } from './Dto';
import { ContactCreateHelper, ContactUpdateHelper } from './Helpers';

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
