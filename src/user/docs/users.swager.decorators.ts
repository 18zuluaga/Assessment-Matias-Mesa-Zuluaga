import { Type, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBadRequest, ApiCreateResponses } from 'src/common/docs';

export function ApiDocPostUser<T>(entity: Type<T>) {
  const description =
    'you can create users ';
  return applyDecorators(
    ApiOperation({
      summary: 'create new user ',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocGetUser<T>(entity: Type<T>) {
  const description =
    'you can get all users';
  return applyDecorators(
    ApiOperation({
      summary: 'get all users',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}


export function ApiDocGetOneUser<T>(entity: Type<T>) {
  const description =
    'you can get a single user by ID';
  return applyDecorators(
    ApiOperation({
      summary: 'get a single user by ID',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocPatchUser<T>(entity: Type<T>) {
  const description =
    'you can update a user by ID';
  return applyDecorators(
    ApiOperation({
      summary: 'update a user by ID',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocDeleteUser<T>(entity: Type<T>) {
  const description =
    'you can delete a user by ID';
  return applyDecorators(
    ApiOperation({
      summary: 'delete a user by ID',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}
