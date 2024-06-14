import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import {
  ContactInfrastructureRequest,
  ContactInfrastructureResponse,
} from './dto';
import { AppService } from './services';
import { ErrorResponse } from '../shared';

@Controller()
export class PruebaController {
  constructor(private service: AppService) {}

  @Get()
  getHello():
    | ContactInfrastructureResponse
    | { message: string; details: any } {
    const data = {
      id: '1',
      name: 'name',
      email: 'email@email.com',
    };
    const result = this.service.createContact(
      new ContactInfrastructureRequest(data),
    );
    if (result.isFailure && result.error instanceof ErrorResponse) {
      throw new HttpException(
        {
          status: result.error.code ?? HttpStatus.INTERNAL_SERVER_ERROR,
          message: result.error.message,
          details: result.error.details,
        },
        result.error.code ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (
      result.isSuccess &&
      result.value instanceof ContactInfrastructureResponse
    ) {
      return result.value;
    }
  }
}
