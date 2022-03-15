import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  // Class interface for dto type
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (...args: any[]): {};
}

// Serialize Decorateur
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run before a request is handled by request handler
    return next.handle().pipe(
      map((data: any) => {
        //incoming User Entity
        // Run before response, data = Response from Handler: UserEntity instance
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, // only includes @Expose
        });
      }),
    );
  }
}
