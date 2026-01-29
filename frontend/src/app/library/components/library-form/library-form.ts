import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryServices } from '../../services/library-services';
import { noFutureDate } from '../../validatrors/date-validator';
import { BookModel } from '../../models/bookModel';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-library-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './library-form.html',
  styleUrl: './library-form.css',
})
export class LibraryForm implements OnInit {
  form!: FormGroup;
  operation = '';
  books: BookModel[] = [];
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryServices,
  ) {}

  ngOnInit(): void {
    this.libraryService.books$.subscribe((b) => (this.books = b));
    this.buildForm();

    this.form = this.fb.group({
      operation: [''],
      data: this.fb.group({}),
    });

    this.form.get('operation')?.valueChanges.subscribe((op) => {
      this.onOperationChange(op);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      operation: ['', Validators.required],
      data: this.fb.group({}),
    });
  }

  onOperationChange(op: string) {
    this.operation = op;
    const data = this.fb.group({});

    switch (op) {
      case 'add':
        data.addControl('title', this.fb.control('', Validators.required));
        data.addControl('author', this.fb.control('', Validators.required));
        data.addControl('isbn', this.fb.control('', Validators.pattern(/^(97(8|9))?\d{9}(\d|X)$/)));
        data.addControl('quantity', this.fb.control('', Validators.min(1)));
        break;

      case 'checkout':
        data.addControl('bookId', this.fb.control(null, Validators.required));
        data.addControl('borrower', this.fb.control('', Validators.required));
        data.addControl('date', this.fb.control(null, noFutureDate));
        break;

      //Return Book
      case 'return':
        data.addControl('bookId', this.fb.control(null, Validators.required));
        data.addControl('returnDate', this.fb.control(null, noFutureDate));
        break;

      //Update Inventory
      case 'update':
        data.addControl('bookId', this.fb.control(null, Validators.required));
        data.addControl('quantity', this.fb.control(1, [Validators.required, Validators.min(1)]));
        break;
    }

    this.form.setControl('data', data);
  }

  submitForm() {
    const value = this.form.value.data;

    switch (this.operation) {
      case 'add':
        this.libraryService.addBook(value);
        break;

      case 'checkout':
        this.libraryService.checkOutBook(value.bookId);
        break;

      case 'return':
        this.libraryService.returnBook(value.bookId);
        break;

      case 'update':
        this.libraryService.updateInventory(value.bookId, value.quantity);
    }
    this.successMsg = 'Operation completed successfully!';
    this.form.reset();
  }
}
