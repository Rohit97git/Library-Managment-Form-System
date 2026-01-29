import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryForm } from './library-form';

describe('LibraryForm', () => {
  let component: LibraryForm;
  let fixture: ComponentFixture<LibraryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
