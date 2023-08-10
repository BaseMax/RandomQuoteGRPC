import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {
    console.log({ exception, host: host.getArgs() });

    const message: any = exception.message;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // response.status(error.code).json(error);
  }
}
