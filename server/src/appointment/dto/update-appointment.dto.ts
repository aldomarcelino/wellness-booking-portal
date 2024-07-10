import { IsEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  readonly event_date: Date;

  @IsOptional()
  @IsString()
  readonly location: string;

  @IsOptional()
  @IsString()
  readonly status: string;

  @IsOptional()
  readonly rejected_reason: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
