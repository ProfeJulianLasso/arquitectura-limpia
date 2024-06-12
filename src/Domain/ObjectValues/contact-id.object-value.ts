import { IObjectValue } from './Interface';

const MAX_LENGTH = 36;

export class ContactIdObjectValue implements IObjectValue {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  validate(): boolean {
    return this.value.length === MAX_LENGTH;
  }
}
