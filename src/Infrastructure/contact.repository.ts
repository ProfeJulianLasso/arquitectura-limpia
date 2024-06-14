import { Injectable } from '@nestjs/common';
import {
  ContactApplicationRequest,
  ContactRepositoryBase,
} from '../Application';

@Injectable()
export class ContactRepository extends ContactRepositoryBase {
  create(data: ContactApplicationRequest): void {
    console.log('Create contact', data);
    throw new Error('Method not implemented.');
  }
  update(data: ContactApplicationRequest): void {
    console.log('Update contact', data);
    throw new Error('Method not implemented.');
  }
}
