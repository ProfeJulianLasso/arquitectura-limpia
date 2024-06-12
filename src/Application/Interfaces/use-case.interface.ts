export interface IUseCase<Requests, Response> {
  execute(request: Requests): Response;
}
