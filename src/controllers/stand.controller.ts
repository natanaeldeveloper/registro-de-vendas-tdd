import { CreateStandDto } from '@/dtos/create-stand.dto';
import { StandService } from '@/services/stand.service';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('stands')
export class StandController {
  constructor(protected readonly standService: StandService) {}

  @Get()
  async getAll(@Res() res: Response) {
    const data = await this.standService.findAll();

    return res.json({
      data,
    });
  }

  @Post()
  async create(@Body() dto: CreateStandDto, @Res() res: Response) {
    const data = await this.standService.create(dto);

    return res.status(HttpStatus.CREATED).json({
      data,
    });
  }
}
