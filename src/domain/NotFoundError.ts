export default class NotFoundError extends Error {
  statusCode?: number;

  constructor (message: string) {
    super(message)
    this.name = 'AuthenticationError'
    this.statusCode = 404
  }
}