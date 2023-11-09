import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, QueryParamDto } from './dto/movie.dto';
import { Roles } from '../shared/role.decorator';
import { Role } from '../shared/role.enum';
import { AuthGuard } from '../shared/auth.gaurd';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('movies')
@ApiBearerAuth()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard)
  findAll(@Query() movieFilter: QueryParamDto) {
    return this.moviesService.findAll(movieFilter);
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateMovieDto: CreateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
