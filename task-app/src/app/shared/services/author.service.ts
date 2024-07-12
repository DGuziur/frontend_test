import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  authorVisible = signal<boolean>(false);
}
