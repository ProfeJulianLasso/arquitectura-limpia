import { Injectable } from '@nestjs/common';
import {
  ContactApplicationRequest,
  ContactRepositoryBase,
} from '../application';

@Injectable()
export class ContactRepository extends ContactRepositoryBase {
  create(data: ContactApplicationRequest): void {
    console.log('Create contact', data);
  }
  update(data: ContactApplicationRequest): void {
    console.log('Update contact', data);
  }
}
