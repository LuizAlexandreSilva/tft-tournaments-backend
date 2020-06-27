import { compare, hash } from 'bcryptjs';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}

export default BCryptHashProvider;
