import { randomUUID } from 'crypto';
import {
  ContactIdObjectValue,
  EmailObjectValue,
  NameObjectValue,
} from '../ObjectValues';

export class ContactEntity {
  public id: ContactIdObjectValue;
  public name: NameObjectValue;
  public email: EmailObjectValue;

  constructor({
    id,
    name,
    email,
  }: {
    id?: ContactIdObjectValue;
    name?: NameObjectValue;
    email?: EmailObjectValue;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  public create(name: NameObjectValue, email: EmailObjectValue): this {
    this.id = new ContactIdObjectValue(randomUUID());
    this.name = name;
    this.email = email;
    return this;
  }

  public updateName(name: NameObjectValue): this {
    this.name = name;
    return this;
  }

  public updateEmail(email: EmailObjectValue): this {
    this.email = email;
    return this;
  }
}
