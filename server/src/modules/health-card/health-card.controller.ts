import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthCardService } from './health-card.service';
import { CreateHealthCardDto } from './dto/create-health-card.dto';
import { UpdateHealthCardDto } from './dto/update-health-card.dto';

@Controller('health-card')
export class HealthCardController {
  constructor(private readonly healthCardService: HealthCardService) {}

  @Post()
  create(@Body() createHealthCardDto: CreateHealthCardDto) {
    return this.healthCardService.create(createHealthCardDto);
  }

  @Get()
  findAll() {
    return this.healthCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthCardDto: UpdateHealthCardDto) {
    return this.healthCardService.update(+id, updateHealthCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthCardService.remove(+id);
  }
}
