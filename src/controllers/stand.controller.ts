import { CreateStandDto, UpdateStandDto } from '@/dtos/stand';
import { StandService } from '@/services/stand.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('stands')
export class StandController {
  constructor(protected readonly standService: StandService) {}

  @Post()
  async create(@Body() dto: CreateStandDto, @Res() res: Response) {
    const data = await this.standService.create(dto);
    return res.status(HttpStatus.CREATED).json({
      data,
      statusCode: HttpStatus.CREATED,
      success: 'Created',
      message: 'Banca de vendas registrada com sucesso.',
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStandDto,
    @Res() res: Response,
  ) {
    const data = await this.standService.update(id, dto);
    return res.status(HttpStatus.OK).json({
      data,
      statusCode: HttpStatus.OK,
      success: 'Created',
      message: 'Banca de vendas atualizada com sucesso.',
    });
  }

  @Get()
  async getAll(@Res() res: Response) {
    const data = await this.standService.findAll();
    return res.json({ data });
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const data = await this.standService.findById(id);
    return res.json({ data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const data = await this.standService.delete(id);
    return res.status(HttpStatus.OK).json({ data });
  }
}
