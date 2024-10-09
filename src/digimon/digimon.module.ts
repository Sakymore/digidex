import { Module } from '@nestjs/common';
import { DigimonService } from './digimon.service';
import { DigimonController } from './digimon.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Digimon, DigimonSchema } from './entities/digimon.entity';

@Module({
  controllers: [DigimonController],
  providers: [DigimonService],
  imports: [

    MongooseModule.forFeature([

      {

        name: Digimon.name,
        schema: DigimonSchema
      }

    ])
  ]
})
export class DigimonModule { }
