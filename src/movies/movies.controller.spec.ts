import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './entities/movie.schema';
import { JwtService } from '@nestjs/jwt';

describe('MoviesController', () => {
  let movieController: MoviesController;
  let movieService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/movie-lobby'),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
      ],
      controllers: [MoviesController],
      providers: [MoviesService, JwtService],
    }).compile();

    movieController = module.get<MoviesController>(MoviesController);
    movieService = module.get<MoviesService>(MoviesService);
  });

  it('should list all movies', async () => {
    // Todo WILL ADD this payload in seperate file are FROM test DB
    const movies = [
      {
        title: 'Movie 1',
        genere: ['genere1'],
        rating: 4.5,
        streamingLink: 'https://host.com',
        actors: ['sudheer'],
        directors: ['tupakula'],
      },
    ];

    jest
      .spyOn(movieService, 'findAll')
      .mockResolvedValue(JSON.parse(JSON.stringify(movies)));

    const result = await movieController.findAll({});

    expect(result).toEqual(JSON.parse(JSON.stringify(movies)));
  });
});
