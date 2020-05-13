import {Tag} from './tag';

export class Contact {
  id: number;
  nickName: string;
  firstName: string;
  secondName: string;
  sex: string;
  birthday: string;
  hairColor: string;
  tags: Tag[] = [];
}
