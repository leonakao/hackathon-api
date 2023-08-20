import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  SummaryStoreDto,
  SummaryStoreHandler,
} from '../handlers/store.handler';
import { Request } from 'express';

@Controller('summary')
export class StoreSummaryController {
  constructor(private readonly summaryStoreHandler: SummaryStoreHandler) {}

  @Post()
  async execute(
    @Req() request: Request,
    @Body() storeSummaryDto: SummaryStoreDto,
  ) {
    const summary = await this.summaryStoreHandler.execute(
      request.user,
      storeSummaryDto,
    );

    return summary;
  }
}
