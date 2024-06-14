import { ErrorResponse, Result } from '../../../shared';
import { ContactEntity } from '../../entities';
import { EmailObjectValue, NameObjectValue } from '../../object-values';
import { ContactDomainRequest, ContactDomainResponse } from '../dto';
import { IHelper } from '../interfaces';

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
        message: 'Required id',
        details: {
          field: 'id',
          value: contact.id,
        },
      });
    }

    const contactEntity = new ContactEntity({});

    if (contact.name) {
      const nameObjectValue = new NameObjectValue(contact.name);
      if (!nameObjectValue.validate()) {
        return Result.fail<ErrorResponse>({
          message: 'Invalid name',
          details: {
            field: 'name',
            value: nameObjectValue.value,
          },
        });
      }
      contactEntity.updateName(nameObjectValue);
    }

    if (contact.email) {
      const emailObjectValue = new EmailObjectValue(contact.email);
      if (!emailObjectValue.validate()) {
        return Result.fail<ErrorResponse>({
          message: 'Invalid email',
          details: {
            field: 'email',
            value: emailObjectValue.value,
          },
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
