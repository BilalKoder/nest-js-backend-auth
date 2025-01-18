import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtGuard } from "../guards/jwt.guard"; // Import your custom JwtGuard

export function ApiAuthPermission(isAuth = true) {
    return isAuth
        ? applyDecorators(
              UseGuards(JwtGuard), // Use JwtGuard instead of default AuthGuard('jwt')
              ApiBearerAuth('JWT')
          )
        : applyDecorators();
}
