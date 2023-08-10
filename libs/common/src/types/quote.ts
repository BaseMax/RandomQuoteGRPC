/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "quote";

export interface UpdateQuoteCount {
  count: number;
  hasUpdated: boolean;
}

export interface RemoveQuoteCount {
  count: number;
  hasDeleted: boolean;
}

export interface Quote {
  id: string;
  content: string;
  author: string;
}

export interface FindOneQuoteByIdDto {
  id: string;
}

export interface CreateQuoteDto {
  content: string;
  author: string;
}

export interface UpdateQuoteDto {
  id: string;
  content?: string | undefined;
  author?: string | undefined;
}

export const QUOTE_PACKAGE_NAME = "quote";

export interface QuoteServiceClient {
  findOneQuoteById(request: FindOneQuoteByIdDto): Observable<Quote>;

  createQuote(request: CreateQuoteDto): Observable<Quote>;

  removeQuoteById(request: FindOneQuoteByIdDto): Observable<RemoveQuoteCount>;

  updateQuote(request: UpdateQuoteDto): Observable<UpdateQuoteCount>;
}

export interface QuoteServiceController {
  findOneQuoteById(request: FindOneQuoteByIdDto): Promise<Quote> | Observable<Quote> | Quote;

  createQuote(request: CreateQuoteDto): Promise<Quote> | Observable<Quote> | Quote;

  removeQuoteById(
    request: FindOneQuoteByIdDto,
  ): Promise<RemoveQuoteCount> | Observable<RemoveQuoteCount> | RemoveQuoteCount;

  updateQuote(request: UpdateQuoteDto): Promise<UpdateQuoteCount> | Observable<UpdateQuoteCount> | UpdateQuoteCount;
}

export function QuoteServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOneQuoteById", "createQuote", "removeQuoteById", "updateQuote"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("QuoteService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("QuoteService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const QUOTE_SERVICE_NAME = "QuoteService";
