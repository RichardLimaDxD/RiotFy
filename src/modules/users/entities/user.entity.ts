import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  @IsOptional()
  admin: boolean;

  constructor() {
    this.id = randomUUID();
  }
}
