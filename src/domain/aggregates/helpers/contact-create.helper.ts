import { ErrorResponse, Result, Error } from '../../../shared';
import { ContactEntity } from '../../entities';
import { EmailObjectValue, NameObjectValue } from '../../object-values';
import { ContactDomainRequest, ContactDomainResponse } from '../dto';
import { IHelper } from '../interfaces';

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
      return validationResult;
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
    const errors = new Array<ErrorResponse>();

    if (!data.nameObjectValue.validate()) {
      errors.push(
        new ErrorResponse({
          message: 'Invalid name',
          details: {
            field: 'name',
            value: data.nameObjectValue.value,
          },
        }),
      );
    }

    if (!data.emailObjectValue.validate()) {
      errors.push(
        new ErrorResponse({
          message: 'Invalid email',
          details: {
            field: 'email',
            value: data.emailObjectValue.value,
          },
        }),
      );
    }

    return errors.length > 0
      ? Result.fail(
          new ErrorResponse({
            code: Error.BAD_REQUEST,
            message: 'Validation error',
            details: errors,
          }),
        )
      : Result.ok();
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
