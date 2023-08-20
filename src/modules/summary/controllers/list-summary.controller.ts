import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ListByGroupHandler } from '../handlers/listByGroup.handler';
import { Response } from 'express';

@Controller('summaries')
export class ListSummaryController {
  constructor(private readonly listSummaryByGroup: ListByGroupHandler) {}

  @Get('group/:groupId')
  async ListByGroup(
    @Param('groupId') groupId: string,
    @Res() response: Response,
  ) {
    const summaries = await this.listSummaryByGroup.execute(groupId);

    return response.status(HttpStatus.OK).json(summaries);
  }
}
