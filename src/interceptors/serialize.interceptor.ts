import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run before a request is handled by request handler
    return next.handle().pipe(
      map((data: any) => {
        // Run before response, data = UserEntity instance
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, // only includes @Expose
        });
      }),
    );
  }
}
