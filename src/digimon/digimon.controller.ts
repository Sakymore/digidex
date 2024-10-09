import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DigimonService } from './digimon.service';
import { CreateDigimonDto } from './dto/create-digimon.dto';
import { UpdateDigimonDto } from './dto/update-digimon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('digimon')
export class DigimonController {
  constructor(private readonly digimonService: DigimonService) {}

  @Post()
  create(@Body() createDigimonDto: CreateDigimonDto) {
    return this.digimonService.create(createDigimonDto);
  }

  @Get()
  findAll() {
    return this.digimonService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.digimonService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateDigimonDto: UpdateDigimonDto) {
    return this.digimonService.update(term, updateDigimonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.digimonService.remove(id);
  }
}
