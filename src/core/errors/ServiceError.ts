interface ServiceErrorBody {
  message: string;
  service: string;
  params?: string[];
}

export class ServiceError extends Error {
  constructor(private body: ServiceErrorBody) {
    super(body.message);
    this.name = 'ServiceError';
  }

  getDetails() {
    return this.body;
  }
}
