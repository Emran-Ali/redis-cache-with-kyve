import { Controller, Get, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller('sample')
export class SampleController {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}
  @Get()
  async getData() {
    const cacheKey = 'sample-data111';
    let data = await this.cache.get(cacheKey);
    console.log(data, 'data from cache');
    if (!data) {
      // Simulate fetching data from an external API
      data = 'Sample data from external API to store';
      await this.cache.set(cacheKey, data); // Cache for 1 minute
      return {
        data,
        source: 'API',
      };
    }

    return {
      data,
      source: 'Cache',
    };
  }
}