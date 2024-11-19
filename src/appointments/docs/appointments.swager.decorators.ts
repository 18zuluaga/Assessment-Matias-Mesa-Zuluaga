import { Type, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBadRequest, ApiCreateResponses } from 'src/common/docs';

export function ApiDocPostAppointments<T>(entity: Type<T>) {
  const description =
    'you can create Appointment ';
  return applyDecorators(
    ApiOperation({
      summary: 'create new Appointment ',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocGetAppointments<T>(entity: Type<T>) {
  const description = 'you can get all appointments';
  return applyDecorators(
    ApiOperation({
      summary: 'get all appointments',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocGetOneAppointment<T>(entity: Type<T>) {
  const description = 'you can get an appointment by ID';
  return applyDecorators(
    ApiOperation({
      summary: 'get an appointment by ID',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocPatchAppointmentStatus<T>(entity: Type<T>) {
  const description = 'you can update the status of an appointment';
  return applyDecorators(
    ApiOperation({
      summary: 'update the status of an appointment',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocPatchAppointment<T>(entity: Type<T>) {
  const description = 'you can update an appointment';
  return applyDecorators(
    ApiOperation({
      summary: 'update an appointment',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocDeleteAppointment<T>(entity: Type<T>) {
  const description = 'you can delete an appointment';
  return applyDecorators(
    ApiOperation({
      summary: 'delete an appointment',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}