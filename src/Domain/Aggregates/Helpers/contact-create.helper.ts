import { Result, ErrorResponse } from '../../../Shared';
import { ContactEntity } from '../../Entities';
import { NameObjectValue, EmailObjectValue } from '../../ObjectValues';
import { ContactDomainRequest, ContactDomainResponse } from '../Dto';
import { IHelper } from '../Interfaces';

interface IContactMap {
  nameObjectValue: NameObjectValue;
  emailObjectValue: EmailObjectValue;
}

export class ContactCreateHelper
  implements
    IHelper<
      ContactDomainRequest,
      Result<ContactDomainResponse | ErrorResponse>
    >
{
  execute(
    contact: ContactDomainRequest,
  ): Result<ContactDomainResponse | ErrorResponse> {
    const data = this.createMap(contact);

    const validationResult = this.validate(data);
    if (validationResult.isFailure) {
      return Result.fail(validationResult.error);
    }

    const contactEntity = this.createContact(data);
    const result = this.returnResponse(contactEntity);

    return Result.ok(result);
  }

  private createMap(contact: ContactDomainRequest): IContactMap {
    return {
      nameObjectValue: new NameObjectValue(contact.name),
      emailObjectValue: new EmailObjectValue(contact.email),
    };
  }

  private validate(data: IContactMap): Result<ErrorResponse> {
    if (!data.nameObjectValue.validate()) {
      return Result.fail(
        new ErrorResponse({
          message: 'Invalid name',
        }),
      );
    }

    if (!data.emailObjectValue.validate()) {
      return Result.fail(
        new ErrorResponse({
          message: 'Invalid email',
        }),
      );
    }
    return Result.ok();
  }

  private createContact(data: IContactMap): ContactEntity {
    return new ContactEntity({}).create(
      data.nameObjectValue,
      data.emailObjectValue,
    );
  }

  private returnResponse(contactEntity: ContactEntity): ContactDomainResponse {
    return new ContactDomainResponse({
      id: contactEntity.id.value,
      name: contactEntity.name.value,
      email: contactEntity.email.value,
    });
  }
}
