import { CollectionName } from '../../enums/enums.js';
import { IUserDto } from '../model-types.js';

interface IDbCollection {
  [CollectionName.USERS]: IUserDto[];
}

export { IDbCollection };
