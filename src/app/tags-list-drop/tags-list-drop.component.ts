import {Component, Input, OnInit} from '@angular/core';
import {TagsListService} from '../services/tags-list.service';
import {DataService} from '../services/data.service';
import {Contact} from '../models/contact';

@Component({
  selector: 'app-tags-list-drop',
  templateUrl: './tags-list-drop.component.html',
  styleUrls: ['./tags-list-drop.component.css']
})
export class TagsListDropComponent implements OnInit {
  @Input() row: any;

  constructor(public tagsListService: TagsListService,
              public dataService: DataService,
              ) { }

  ngOnInit() {
  }

  addId(id) {
    const idAttr = 'cdk-drop-list-' + id;
    this.tagsListService.LIST_IDS.push(idAttr);
    return idAttr;
  }

  deleteTag(contactId, tagId) {
    this.dataService.deleteTag(contactId, tagId);
  }
}
