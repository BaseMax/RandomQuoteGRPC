import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto, UpdateQuoteDto } from './dto';
import { Quote, RemoveQuoteCount, UpdateQuoteCount } from '@app/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../auth/guard';
import { Roles, RolesGuard } from '../auth/guard/role.guard';
import { ROLE } from 'apps/user/src/user.model';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('quote')
@UseInterceptors(GrpcToHttpInterceptor)
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get('random')
  randDomQuote(): Quote | Promise<Quote> | Observable<Quote> {
    return this.quoteService.findRandom();
  }

  @Get(':id')
  findOneQuoteById(
    @Param('id') id: string,
  ): Quote | Promise<Quote> | Observable<Quote> {
    return this.quoteService.findOne(id);
  }

  @Roles(ROLE.EDITOR, ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  createQuote(
    @Body() request: CreateQuoteDto,
  ): Quote | Promise<Quote> | Observable<Quote> {
    return this.quoteService.create(request);
  }

  @Roles(ROLE.EDITOR, ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  removeQuoteById(
    @Param('id') id: string,
  ):
    | RemoveQuoteCount
    | Promise<RemoveQuoteCount>
    | Observable<RemoveQuoteCount> {
    return this.quoteService.remove(id);
  }

  @Roles(ROLE.EDITOR, ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id')
  updateQuote(
    @Param('id') id: string,
    @Body() request: UpdateQuoteDto,
  ):
    | UpdateQuoteCount
    | Promise<UpdateQuoteCount>
    | Observable<UpdateQuoteCount> {
    return this.quoteService.update(id, request);
  }
}
