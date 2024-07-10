import { IsNotEmpty, IsString } from 'class-validator';

export class EventTypeDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
