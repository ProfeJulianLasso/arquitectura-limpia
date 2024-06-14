export class Result<Type> {
  public readonly value: Type;
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error: Type;

  private constructor(
    value?: Type,
    isSuccess?: boolean,
    isFailure?: boolean,
    error?: Type,
  ) {
    this.value = value;
    this.isSuccess = isSuccess;
    this.isFailure = isFailure;
    this.error = error;
  }

  private static create<Type>(
    value: Type,
    isSuccess: boolean,
    isFailure: boolean,
    error: Type,
  ): Result<Type> {
    return new Result(value, isSuccess, isFailure, error);
  }

  public static ok<Type>(value?: Type): Result<Type> {
    return Result.create(value, true, null, null);
  }

  public static fail<Type>(error: Type): Result<Type> {
    return Result.create(null, null, true, error);
  }
}
