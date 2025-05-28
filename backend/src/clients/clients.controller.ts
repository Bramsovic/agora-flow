import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import { createObjectCsvStringifier } from 'csv-writer';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() body, @Req() req) {
    return this.clientsService.create(body, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.clientsService.findAll(req.user.id);
  }

  // ⚠️ Doit être avant ":id"
  @Get('export')
  async exportClients(@Req() req, @Res() res: Response) {
    const clients = await this.clientsService.findAll(req.user.id);

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'company', title: 'Company' },
        { id: 'phone', title: 'Phone' },
        { id: 'email', title: 'Email' },
        { id: 'status', title: 'Status' },
        { id: 'createdAt', title: 'Created At' },
      ],
    });

    const csv = csvStringifier.getHeaderString() +
                csvStringifier.stringifyRecords(clients);

    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=clients.csv',
    });

    res.send(csv);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importClients(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.clientsService.importFromCsv(file.buffer, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.clientsService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body, @Req() req) {
    return this.clientsService.update(id, body, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.clientsService.remove(id, req.user.id);
  }
}
