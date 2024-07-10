import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  readonly event_date: Date;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsOptional()
  readonly rejected_reason: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
