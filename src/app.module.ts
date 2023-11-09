import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './shared/jwtConstants';
import { MoviesModule } from './movies/movies.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './shared/transform.interceptor';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/movie-lobby'), //TODO keeping in ENV file is considered as best practice
    UsersModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
