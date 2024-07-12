import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  readonly author: string = 'Dawid Guziur';
  authorVisible = signal<boolean>(false);
}
