import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsListDragComponent } from './tags-list-drag.component';

describe('TagsListDragComponent', () => {
  let component: TagsListDragComponent;
  let fixture: ComponentFixture<TagsListDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsListDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
