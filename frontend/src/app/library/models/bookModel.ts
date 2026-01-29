export interface BookModel {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  lastBorrower?: string;
  lastCheckoutDate?: string;
}
