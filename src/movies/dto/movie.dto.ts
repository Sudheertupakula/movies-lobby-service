import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  genre: string[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  streaminLink: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  actors: string[];

  @ApiProperty({ required: false })
  @IsNotEmpty()
  directors: string[];
}

export class QueryParamDto {
  @ApiProperty({ required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  genre?: string[];
}
