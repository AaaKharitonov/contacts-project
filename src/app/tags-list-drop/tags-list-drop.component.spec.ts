import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsListDropComponent } from './tags-list-drop.component';

describe('TagsListDropComponent', () => {
  let component: TagsListDropComponent;
  let fixture: ComponentFixture<TagsListDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsListDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
