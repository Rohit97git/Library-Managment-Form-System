import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookModel } from '../models/bookModel';

@Injectable({
  providedIn: 'root',
})
export class LibraryServices {
  private booksSubject = new BehaviorSubject<BookModel[]>([]);
  books$ = this.booksSubject.asObservable();

  private idCounter = 1;

  get books(): BookModel[] {
    return this.booksSubject.value;
  }

  addBook(book: Omit<BookModel, 'id'>) {
    this.booksSubject.next([...this.books, { ...book, id: this.idCounter++ }]);
  }

  checkOutBook(bookId: number) {
    this.updateQuantity(bookId, -1);
  }

  returnBook(bookId: number) {
    this.updateQuantity(bookId, 1);
  }

  updateInventory(bookId: number, quantity: number) {
    this.booksSubject.next(
      this.books.map((book) => (book.id === bookId ? { ...book, quantity } : book)),
    );
  }

  private updateQuantity(bookId: number, change: number) {
    this.booksSubject.next(
      this.books.map((book) =>
        book.id === bookId ? { ...book, quantity: book.quantity + change } : book,
      ),
    );
  }
}
