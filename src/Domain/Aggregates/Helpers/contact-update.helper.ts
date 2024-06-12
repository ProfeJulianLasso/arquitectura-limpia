import { Result, ErrorResponse } from '../../../Shared';
import { ContactEntity } from '../../Entities';
import { NameObjectValue, EmailObjectValue } from '../../ObjectValues';
import { ContactDomainRequest, ContactDomainResponse } from '../Dto';
import { IHelper } from '../Interfaces';

export class ContactUpdateHelper
  implements
    IHelper<
      ContactDomainRequest,
      Result<ContactDomainResponse | ErrorResponse>
    >
{
  execute(
    contact: ContactDomainRequest,
  ): Result<ContactDomainResponse | ErrorResponse> {
    if (!contact.id) {
      return Result.fail<ErrorResponse>({
        message: 'Invalid id',
      });
    }

    const contactEntity = new ContactEntity({});

    if (contact.name) {
      const nameObjectValue = new NameObjectValue(contact.name);
      if (!nameObjectValue.validate()) {
        return Result.fail<ErrorResponse>({
          message: 'Invalid name',
        });
      }
      contactEntity.updateName(nameObjectValue);
    }

    if (contact.email) {
      const emailObjectValue = new EmailObjectValue(contact.email);
      if (!emailObjectValue.validate()) {
        return Result.fail<ErrorResponse>({
          message: 'Invalid email',
        });
      }
      contactEntity.updateEmail(emailObjectValue);
    }

    return Result.ok(
      new ContactDomainResponse({
        id: contact.id,
        name: contactEntity.name.value,
        email: contactEntity.email.value,
      }),
    );
  }
}
