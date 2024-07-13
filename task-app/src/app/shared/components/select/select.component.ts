import { Component, inject } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { ArticlesService } from '../../../modules/task/services/articles.service';

@Component({
  selector: 'task-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  protected readonly authorService = inject(AuthorService);
  protected readonly articleService = inject(ArticlesService);

  toggleAuthorVisible(): void {
    this.authorService.authorVisible.update((currentVal) => !currentVal);
  }

  appReset(): void {
    this.authorService.authorVisible.set(false);
    this.articleService.resetArticles();
  }
}
