import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(value, salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
