import { ContactApplicationRequest } from '../UseCases';

export abstract class ContactRepositoryBase {
  abstract create(data: ContactApplicationRequest): void;
  abstract update(data: ContactApplicationRequest): void;
}
