import { Injectable } from '@nestjs/common';
import { ContactRepositoryBase } from '../../Application';
import { IApplication } from '../../Application/Interfaces';
import { Application } from '../../Application/application.class';
import { ErrorResponse, Result } from '../../Shared';
import {
  ContactInfrastructureRequest,
  ContactInfrastructureResponse,
} from '../Dto';

@Injectable()
export class AppService {
  private application: IApplication;
  private repository: ContactRepositoryBase;

  constructor(application: Application, repo: ContactRepositoryBase) {
    this.application = application;
    this.repository = repo;
  }

  createContact(
    data: ContactInfrastructureRequest,
  ): Result<ContactInfrastructureResponse | ErrorResponse> {
    return this.application.createContact(data);
  }

  updateContact() {
    return 'This action updates a contact';
  }
}
