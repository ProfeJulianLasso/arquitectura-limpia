import { IObjectValue } from './Interface';

export class EmailObjectValue implements IObjectValue {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  validate() {
    return this.value.includes('@');
  }
}
