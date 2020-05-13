import {Injectable} from '@angular/core';
import {Contact} from '../models/contact';

@Injectable()
export class DataService {

  contacts: Contact[] = [
    // tslint:disable-next-line:max-line-length
    { id: 1, nickName: 'nickName1', firstName:  'firstName1', secondName: 'secondName1', sex : 'sex1', birthday: 'birthday1', hairColor: 'hairColor1' ,
      tags: [{id: 1, title: 'music'}, {id: 2, title: 'job'}]
    },
    // tslint:disable-next-line:max-line-length
    { id: 2, nickName: 'nickName2', firstName:  'firstName2', secondName: 'secondName2', sex : 'sex2', birthday: 'birthday2', hairColor: 'hairColor2' ,
      tags: [{id: 3, title: 'classmate'}]
    },
    // tslint:disable-next-line:max-line-length
    { id: 3, nickName: 'nickName3', firstName:  'firstName3', secondName: 'secondName3', sex : 'sex3', birthday: 'birthday3', hairColor: 'hairColor3' ,
      tags: []
    }
  ];

  constructor() {}

  get data(): Contact[] {
    return this.contacts;
  }

  getAllContacts(): void {
  }

  addContact(contact: Contact): void {
    contact.tags = [];
    contact.id = Math.max.apply(Math, this.contacts.map(o => o.id)) + 1;

    this.contacts.push(contact);
  }

  updateContact(contact: Contact): void {
    contact.tags = this.contacts.find(x => x.id === contact.id).tags;

    const foundIndex = this.contacts.findIndex(x => x.id === contact.id);
    this.contacts[foundIndex] = contact;
  }

  deleteContact(id: number): void {
    const foundIndex = this.contacts.findIndex(x => x.id === id);
    this.contacts.splice(foundIndex, 1);
  }

  deleteTag(contactId: number, tagId: number) {
    // todo rewrite
    console.log(`contactId: ${contactId} tagId: ${tagId}`);

    const contact: Contact = this.contacts.find(x => x.id === contactId);

    const indexToDelete = contact.tags.findIndex(x => x.id === tagId);

    contact.tags.splice(indexToDelete, 1);
  }

  find(id: number): Contact {
    return this.contacts.find(x => x.id === id);
  }
}
