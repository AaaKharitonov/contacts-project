import { Component, OnInit } from '@angular/core';
import {TagsListService} from '../services/tags-list.service';

@Component({
  selector: 'app-tags-list-drag',
  templateUrl: './tags-list-drag.component.html',
  styleUrls: ['./tags-list-drag.component.css']
})
export class TagsListDragComponent implements OnInit {

  constructor(public tagsListService: TagsListService) { }

  ngOnInit() {
  }

  addNewTag(title: string) {
    this.tagsListService.add(title);
  }
}
