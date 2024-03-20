import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { REQUEST_USERKEY } from "../iam.constant";
import { ActiveUserData } from "../interfaces/active-user-data.interface";

export const ActiveUser = createParamDecorator(
    (field : keyof ActiveUserData | undefined , ctx : ExecutionContext) => {
        const req =ctx.switchToHttp().getRequest();
        const user : ActiveUserData | undefined = req[REQUEST_USERKEY]


        return field ? user?.[field] : user;
    }
)