import { IObjectValue } from './interface';

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 50;

export class NameObjectValue implements IObjectValue {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  validate(): boolean {
    return (
      this.value.length >= MIN_NAME_LENGTH &&
      this.value.length <= MAX_NAME_LENGTH
    );
  }
}
