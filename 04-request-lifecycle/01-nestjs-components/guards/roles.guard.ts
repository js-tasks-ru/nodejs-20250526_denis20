import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const userRole = req.headers["x-role"];

    if (userRole !== "admin")
      throw new ForbiddenException("Доступ запрещён: требуется роль admin");

    return userRole === "admin";
  }
}
