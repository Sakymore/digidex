import { Injectable } from '@nestjs/common';
import { DigiResponse } from './interface/digi-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Digimon } from 'src/digimon/entities/digimon.entity';
import { Model } from 'mongoose';
import { url } from 'inspector';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Digimon.name)
    private readonly digimonModel: Model<Digimon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.digimonModel.deleteMany({});

    const data = await this.http.get<DigiResponse>(
      'https://digi-api.com/api/v1/digimon?pageSize=500',
    );

    const digimonToInsert: { name: string; no: number }[] = [];

    data.content.forEach(async ({ id, name }) => {
      //console.log("el id es : " + id + "el nombre es : " + name);
      const no = id; // si lo dejo con el nombre id da error de index

      digimonToInsert.push({ name, no });

      //const digimon = await this.digimonModel.create({ name, no })
      //console.log("create es igual a : " + digimon);
    });
    await this.digimonModel.insertMany(digimonToInsert);
    return 'Seed ejecutado';
  }
}
