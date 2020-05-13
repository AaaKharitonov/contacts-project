import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsListTestComponent } from './tags-list-test.component';

describe('TagsListTestComponent', () => {
  let component: TagsListTestComponent;
  let fixture: ComponentFixture<TagsListTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsListTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
