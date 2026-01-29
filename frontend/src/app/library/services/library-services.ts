import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { BookModel } from '../models/bookModel';

@Injectable({ providedIn: 'root' })
export class LibraryServices {
  private baseUrl = 'http://localhost:3000';

  private booksSubject = new BehaviorSubject<BookModel[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  loadBooks() {
    this.http
      .get<BookModel[]>(`${this.baseUrl}/books`)
      .subscribe((books) => this.booksSubject.next(books));
  }

  // 📚 ADD BOOK
  addBook(book: Omit<BookModel, 'id'>) {
    this.http.post(`${this.baseUrl}/books`, book).subscribe(() => {
      this.loadBooks();
    });
  }

  // 📤 CHECKOUT BOOK
  checkoutBook(bookId: number, borrower: string, date: string) {
    const book = this.booksSubject.value.find((b) => b.id === bookId);
    if (!book || book.quantity === 0) return;

    // 1️⃣ Reduce inventory
    this.http
      .patch(`${this.baseUrl}/books/${bookId}`, {
        quantity: book.quantity - 1,
      })
      .subscribe(() => this.loadBooks());

    // 2️⃣ Save checkout record
    this.http
      .post(`${this.baseUrl}/checkouts`, {
        bookId,
        borrower,
        checkoutDate: date,
      })
      .subscribe();
  }

  // 📥 RETURN BOOK
  returnBook(bookId: number, date: string) {
    const book = this.booksSubject.value.find((b) => b.id === bookId);
    if (!book) return;

    // 1️⃣ Increase inventory
    this.http
      .patch(`${this.baseUrl}/books/${bookId}`, {
        quantity: book.quantity + 1,
      })
      .subscribe(() => this.loadBooks());

    // 2️⃣ Save return record
    this.http
      .post(`${this.baseUrl}/returns`, {
        bookId,
        returnDate: date,
      })
      .subscribe();
  }

  // 🔄 UPDATE INVENTORY
  updateInventory(bookId: number, newQuantity: number) {
    const book = this.booksSubject.value.find((b) => b.id === bookId);
    if (!book) return;

    // 1️⃣ Update inventory
    this.http
      .patch(`${this.baseUrl}/books/${bookId}`, {
        quantity: newQuantity,
      })
      .subscribe(() => this.loadBooks());

    // 2️⃣ Save inventory update log
    this.http
      .post(`${this.baseUrl}/inventoryUpdates`, {
        bookId,
        oldQuantity: book.quantity,
        newQuantity,
        updatedAt: new Date().toISOString(),
      })
      .subscribe();
  }
}
