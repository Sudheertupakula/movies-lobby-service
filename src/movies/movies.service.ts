import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto, QueryParamDto } from './dto/movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './entities/movie.schema';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}
  async create(createMovieDto: CreateMovieDto) {
    const movie = await new this.movieModel(createMovieDto).save();
    return movie;
  }

  async findAll(movieFilter: QueryParamDto) {
    const { title, genre } = movieFilter;
    const filter = {};
    if (title) filter['title'] = { $options: 'i', $regex: title };
    if (genre) filter['genre'] = { $in: genre };
    const movies = await this.movieModel.find(filter);
    return movies;
  }

  async findOne(id: string) {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException();
    return movie;
  }

  async update(id: string, updateMovieDto: CreateMovieDto) {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException();

    const updatedMovie = await this.movieModel.findByIdAndUpdate(id, {
      $set: updateMovieDto,
    });

    return updatedMovie;
  }

  async remove(id: string) {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException();
    const deletedMovie = await this.movieModel.findByIdAndDelete(id);
    return deletedMovie;
  }
}
