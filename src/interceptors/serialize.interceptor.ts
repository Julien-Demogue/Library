/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable prettier/prettier */
import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UseInterceptors
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserDto } from 'src/users/dto/user.dto'

interface Classconstructor {
    new (...args: any): {}
}

export function Serialize(dto: Classconstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //Run somthing before a request is handled by the request handler
        // console.log("I'm running before the handler")

        return next.handle().pipe(
            map(
                (data: any) => {
                    //Run somthing before the response is sent out
                    // console.log("I'm running before the response is sent out", data)
                    return plainToInstance(UserDto, data, {
                        excludeExtraneousValues: true
                    })
                }
            )

        )
    }


}