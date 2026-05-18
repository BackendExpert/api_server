import { Module, Global } from '@nestjs/common';
import { SqliteService } from 'src/common/utils/sqlite.service';

@Global()
@Module({
  providers: [SqliteService],
  exports: [SqliteService],
})
export class SqliteModule {}