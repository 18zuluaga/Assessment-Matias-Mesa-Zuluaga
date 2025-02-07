import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ValidPermissions } from 'src/common/enum/valid-permissions.enum';
import { ValidEntities } from 'src/common/enum/entities.enum';
import { PermissionJWT, UserJWT } from 'src/common/interfaces/jwt.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token is not found');
    }

    try {
      const payload: UserJWT = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const permissions = this.reflector.get<string[]>(
        'permissions',
        context.getHandler()
      );
      const entity = this.reflector.get<string[]>('entity', context.getHandler());
      const role = this.reflector.get<string[]>('role', context.getHandler());
      if (role){
        if (!role.includes(payload.role.name)) {
          throw new UnauthorizedException(
            `The role '${payload.role.name}' does not have permissions of (${role}).`
          );
        }
  
  
        if (permissions[0] !== undefined && entity[0] !== undefined) {
          if (
            !(Object.values(ValidPermissions) as string[]).includes(
              permissions[0]
            )
          ) {
            throw new UnauthorizedException(
              `[${permissions[0]}] is an invalid permission`
            );
          }
  
          if (!(Object.values(ValidEntities) as string[]).includes(entity[0])) {
            throw new UnauthorizedException(
              `[${entity[0]}] is an invalid entity`
            );
          }
          const userPermissions = payload.role.permissions;
  
          const entityPermissions = userPermissions.find(
            (permission: PermissionJWT) => {
              return permission.entity === entity[0];
            }
          );
  
          if (!entityPermissions || !entityPermissions[permissions[0]]) {
            throw new UnauthorizedException(
              `The role '${payload.role.name}' does not have permission for (${permissions}) in the entity: ${entity}.`
            );
          }
        }
      }

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
