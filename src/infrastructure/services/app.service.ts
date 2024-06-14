import { Injectable } from '@nestjs/common';
import { ApplicationBase, ContactApplicationResponse } from '../../application';
import { ErrorResponse, Result } from '../../shared';
import {
  ContactInfrastructureRequest,
  ContactInfrastructureResponse,
} from '../dto';

@Injectable()
export class AppService {
  private application: ApplicationBase;

  constructor(application: ApplicationBase) {
    this.application = application;
  }

  createContact(
    data: ContactInfrastructureRequest,
  ): Result<ContactInfrastructureResponse | ErrorResponse> {
    const result = this.application.createContact(data);

    if (result.isFailure) {
      return result;
    }

    if (
      result.isSuccess &&
      result.value instanceof ContactApplicationResponse
    ) {
      return Result.ok(
        new ContactInfrastructureResponse({
          id: result.value.id,
          name: result.value.name,
          email: result.value.email,
        }),
      );
    }
  }

  updateContact() {
    return 'This action updates a contact';
  }
}
