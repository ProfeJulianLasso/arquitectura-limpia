import { Controller, Get } from '@nestjs/common';
import { AppService } from './services';
import { ContactInfrastructureRequest } from './Dto';

@Controller()
export class PruebaController {
  constructor(private service: AppService) {}
  @Get()
  getHello(): string {
    const data = {
      id: '1',
      name: 'name',
      email: 'email@email.com',
    };
    this.service.createContact(new ContactInfrastructureRequest(data));
    return 'Hello World!';
  }
}
