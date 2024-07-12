import { Component, inject } from '@angular/core';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'task-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  protected readonly authorService = inject(AuthorService);

  toggleAuthorVisible(): void {
    this.authorService.authorVisible.update((currentVal) => !currentVal);
  }
}
