import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDigimonDto } from './dto/create-digimon.dto';
import { UpdateDigimonDto } from './dto/update-digimon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Digimon } from './entities/digimon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CLIENT_RENEG_LIMIT } from 'tls';

@Injectable()
export class DigimonService {

  constructor(
    @InjectModel(Digimon.name)
    private readonly digimonModel: Model<Digimon>

  ) { }

  async create(createDigimonDto: CreateDigimonDto) {
    createDigimonDto.name = createDigimonDto.name.toLocaleLowerCase();

    try {
      const digimon = await this.digimonModel.create(createDigimonDto)
      return digimon;

    } catch (error) {

      this.handelExceptions(error)

    }

  }

  findAll() {
    return `This action returns all digimon`;
  }

  async findOne(term: string) {

    let digimon: Digimon;

    if (!isNaN(+term)) {

      digimon = await this.digimonModel.findOne({ no: term });

    }

    // MongoID
    if (!digimon && isValidObjectId(term)) {

      digimon = await this.digimonModel.findById(term);

    }

    if (!digimon) {

      digimon = await this.digimonModel.findOne({ name: term.toLocaleLowerCase().trim() })

    }

    //Name

    if (!digimon) throw new NotFoundException(`Digimon con el id, nombre "${term}" no encontrado`)

    return digimon;
  }

  async update(term: string, updateDigimonDto: UpdateDigimonDto) {

    const digimon = await this.findOne(term);

    if (updateDigimonDto.name)
      updateDigimonDto.name = updateDigimonDto.name.toLowerCase();

    try {
      await digimon.updateOne(updateDigimonDto);
      return { ...digimon.toJSON() };
    } catch (error) {
      this.handelExceptions(error)
    }
  }

  async remove(id: string) {
    //const digimon = await this.findOne(id);
    // await digimon.deleteOne();
    //return {id};
    const { deletedCount } = await this.digimonModel.deleteOne({ _id: id })
    if (deletedCount === 0) {
      throw new BadRequestException(`El digimon con el id "${id}" no fue encontrado `);

    }
    return;
  }

  private handelExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Digimon existe en la base de datos ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException(`No se puede crear Digimon - Revisa el log del servidor`)
  }
}
