import { ErrorResponse, Result } from '../../shared';
import {
  ContactApplicationRequest,
  ContactApplicationResponse,
} from '../use-cases';

export abstract class ApplicationBase {
  abstract createContact(
    data: ContactApplicationRequest,
  ): Result<ContactApplicationResponse | ErrorResponse>;
  abstract updateContact(
    data: ContactApplicationRequest,
  ): Result<ContactApplicationResponse | ErrorResponse>;
}
