import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Model, Models } from 'mongoose';
import { TweetDocument, TweetSchemaClass } from './entities/tweet.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(TweetSchemaClass.name)
    private readonly tweetModel: Model<TweetDocument>,
  ) {}
  async create(createTweetDto: CreateTweetDto) {
    const tweetDoc = new this.tweetModel(createTweetDto);
    await tweetDoc.save();
    return tweetDoc;
  }

  findAll() {
    return `This action returns all tweets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tweet`;
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  remove(id: number) {
    return `This action removes a #${id} tweet`;
  }
}
