import { Injectable } from '@nestjs/common';
import { CreateHealthCardDto } from './dto/create-health-card.dto';
import { UpdateHealthCardDto } from './dto/update-health-card.dto';

@Injectable()
export class HealthCardService {
  create(createHealthCardDto: CreateHealthCardDto) {
    return 'This action adds a new healthCard';
  }

  findAll() {
    return `This action returns all healthCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthCard`;
  }

  update(id: number, updateHealthCardDto: UpdateHealthCardDto) {
    return `This action updates a #${id} healthCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthCard`;
  }
}
