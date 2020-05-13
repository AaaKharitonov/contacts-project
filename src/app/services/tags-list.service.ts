import { Injectable } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Tag} from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsListService {

  constructor() { }

  LIST_IDS = [];

  private tags: Tag[] = [
    {id: 1, title: 'music'},
    {id: 2, title: 'job'},
    {id: 3, title: 'classmate'},
    {id: 4, title: 'gum'},
  ];

  public getTags(): Tag[] {
    return this.tags;
  }

  public add(title: string) {
    if (this.tags.find(x => x.title === title)) {
      console.log(`Tag with title: ${title} already exists`);
    } else {
      const id = Math.max.apply(Math, this.tags.map(o => o.id)) + 1;
      this.tags.push(new Tag(id, title));
    }
  }

  drop(event: CdkDragDrop<Tag[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // prevent removing item from drag list
      const myClonedArray  = Object.assign([], event.previousContainer.data);

      // todo get value not text

      const draggedItemTitle = event.item.element.nativeElement.textContent;
      const index = event.container.data.findIndex(x => x.title === draggedItemTitle.trim());

      if (index !== -1) {
        console.log(`Tag with title: ${draggedItemTitle} already exists` );
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }

      this.tags = myClonedArray;
    }
  }
}
