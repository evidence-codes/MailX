import {
  IsString,
  IsEmail,
  IsDateString,
  IsIn,
  IsNotEmpty,
} from "class-validator";

export class CreateReminderDto {
  @IsEmail()
  @IsNotEmpty()
  recipientEmail: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsDateString()
  @IsNotEmpty()
  scheduledTime: string;

  @IsString()
  @IsIn(["pending", "sent"])
  status: string;
}
