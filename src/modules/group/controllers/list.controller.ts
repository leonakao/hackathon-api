import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { ListGroupHandler } from '../handlers/listGroup.handler';
import { Request, Response } from 'express';

@Controller('groups')
export class ListController {
  constructor(private readonly listGroupHandler: ListGroupHandler) {}

  @Get()
  async execute(@Req() request: Request, @Res() response: Response) {
    const groups = await this.listGroupHandler.execute(request.user.id);

    return response.status(HttpStatus.OK).json(groups);
  }
}
