import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Tag} from '../models/tag';

@Component({
  selector: 'app-tags-list-test',
  templateUrl: './tags-list-test.component.html',
  styleUrls: ['./tags-list-test.component.css']
})
export class TagsListTestComponent {
  dropData1: Tag[] = [
    {id: 1, title: 'Get to work'},
    {id: 2, title: 'Pick up groceries'},
    {id: 3, title: 'Go home'},
    {id: 4, title: 'Fall asleep'},
  ];

  dropData2 = [
    {id: 1, title: 'Get to work'},
    {id: 2, title: 'Pick up groceries'},
    {id: 3, title: 'Go home'},
    {id: 4, title: 'Fall asleep'},
  ];

  dropData3 = [
    {id: 1, title: 'Get to work'},
    {id: 2, title: 'Pick up groceries'},
    {id: 3, title: 'Go home'},
    {id: 4, title: 'Fall asleep'},
  ];

  dragData = [
    {id: 1, title: 'Get up'},
    {id: 2, title: 'Brush teeth'},
    {id: 3, title: 'Take a shower'},
    {id: 4, title: 'Check e-mail'},
    {id: 5, title: 'Walk dog'},
  ];

  getInitialData(){
    return [
      {id: 1, title: 'Get up'},
      {id: 2, title: 'Brush teeth'},
      {id: 3, title: 'Take a shower'},
      {id: 4, title: 'Check e-mail'},
      {id: 5, title: 'Walk dog'},
    ];
  }

  LIST_IDS = [];

  addId(id) {
    const idAttr = 'cdk-drop-list-' + id;
    this.LIST_IDS.push(idAttr);
    return idAttr;
  }

  drop(event: CdkDragDrop<Tag[]>) {
    console.log('aaa', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.dragData = this.getInitialData();
  }
}

