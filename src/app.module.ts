import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core';
import { RecreandoModule } from './recreando/recreando.module';

@Module({
  imports: [CoreModule, RecreandoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
