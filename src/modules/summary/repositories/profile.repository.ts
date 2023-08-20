import { StoreEntity } from 'src/shared/types';
import { Profile } from '../entities/profile.entity';

export abstract class ProfileRepository {
  abstract store(profile: StoreEntity<Profile>): Promise<Profile>;
}
