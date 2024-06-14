import { ErrorResponse, Result } from '../../Shared';
import {
  ContactApplicationRequest,
  ContactApplicationResponse,
} from '../UseCases';

export interface IApplication {
  createContact(
    data: ContactApplicationRequest,
  ): Result<ContactApplicationResponse | ErrorResponse>;
  updateContact(
    data: ContactApplicationRequest,
  ): Result<ContactApplicationResponse | ErrorResponse>;
}
