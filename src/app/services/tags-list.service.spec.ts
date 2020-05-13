import { TestBed } from '@angular/core/testing';

import { TagsListService } from './tags-list.service';

describe('TagsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagsListService = TestBed.get(TagsListService);
    expect(service).toBeTruthy();
  });
});
