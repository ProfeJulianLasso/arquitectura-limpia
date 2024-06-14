export interface IHelper<Request, Response> {
  execute(request: Request): Response;
}
