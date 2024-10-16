import { Module } from '@nestjs/common';
import { DigimonService } from './digimon.service';
import { DigimonController } from './digimon.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Digimon, DigimonSchema } from './entities/digimon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [DigimonController],
  providers: [DigimonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Digimon.name,
        schema: DigimonSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class DigimonModule {}
