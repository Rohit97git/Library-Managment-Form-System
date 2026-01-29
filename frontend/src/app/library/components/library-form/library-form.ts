import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryServices } from '../../services/library-services';
import { noFutureDate } from '../../validatrors/date-validator';
import { BookModel } from '../../models/bookModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './library-form.html',
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

  ngOnInit() {
    this.buildForm();
    this.libraryService.books$.subscribe((b) => (this.books = b));

    this.form.get('operation')?.valueChanges.subscribe((op) => {
      this.operation = op;
      this.successMsg = '';
      this.buildDynamicForm(op);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      operation: ['', Validators.required],
      data: this.fb.group({}),
    });
  }

  buildDynamicForm(op: string) {
    const data = this.fb.group({});

    switch (op) {
      case 'add':
        data.addControl('title', this.fb.control('', Validators.required));
        data.addControl('author', this.fb.control('', Validators.required));
        data.addControl(
          'isbn',
          this.fb.control('', [Validators.required, Validators.pattern(/^(97(8|9))?\d{9}(\d|X)$/)]),
        );
        data.addControl(
          'quantity',
          this.fb.control(null, [Validators.required, Validators.min(1)]),
        );
        break;

      case 'checkout':
        data.addControl('bookId', this.fb.control(null, Validators.required));
        data.addControl('borrower', this.fb.control('', Validators.required));
        data.addControl('date', this.fb.control(null, [Validators.required, noFutureDate]));
        break;

      case 'return':
        data.addControl('bookId', this.fb.control(null, Validators.required));
        data.addControl('date', this.fb.control(null, [Validators.required, noFutureDate]));
        break;

      case 'update':
        data.addControl('bookId', this.fb.control(null, Validators.required));
        data.addControl(
          'quantity',
          this.fb.control(null, [Validators.required, Validators.min(1)]),
        );
        break;
    }

    this.form.setControl('data', data);
  }

  submitForm() {
    if (this.form.invalid) return;

    const value = this.form.value.data;

    if (!confirm(`Confirm ${this.operation} operation?`)) return;

    switch (this.operation) {
      case 'add':
        this.libraryService.addBook(value);
        break;

      case 'checkout':
        this.libraryService.checkoutBook(value.bookId, value.borrower, value.date);
        break;

      case 'return':
        this.libraryService.returnBook(value.bookId, value.date);
        break;

      case 'update':
        this.libraryService.updateInventory(value.bookId, value.quantity);
        break;
    }

    this.successMsg = 'Operation completed successfully!';
    this.form.reset();
    this.operation = '';
  }
}
