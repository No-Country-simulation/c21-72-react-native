import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',  // Tipo de base de datos
      host: process.env.DB_HOST, // Dirección del servidor de base de datos
      port: Number(process.env.DB_PORT),        // Puerto por defecto de PostgreSQL
      username: process.env.DB_USERNAME,  // Nombre de usuario de la base de datos
      password: process.env.DB_PASSWORD,  // Contraseña de la base de datos
      database: process.env.DB_NAME,  // Nombre de la base de datos
      autoLoadEntities: true,
      synchronize: true, // Solo en desarrollo, sincroniza las entidades con la DB
    }),

    TodoModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
