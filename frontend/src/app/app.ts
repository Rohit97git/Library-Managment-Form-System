import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
import { LibraryForm } from './library/components/library-form/library-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, LibraryForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
