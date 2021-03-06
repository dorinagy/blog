import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] }), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
