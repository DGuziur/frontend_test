import { Component, inject, output } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TextareaComponent } from '../../../../shared/components/textarea/textarea.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Article } from '../../types/article.type';
import { ArticlesService } from '../../services/articles.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'article-form-component',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, TextareaComponent],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent {
  private readonly articlesService = inject(ArticlesService);
  private readonly notificationService = inject(NotificationService);
  close = output();
  form = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    text: new FormControl<string>('', Validators.required),
  });

  saveArticle(): void {
    const newArticle = this.form.value as Article;
    this.articlesService.addNewArticle(newArticle);
    this.form.reset();
    this.notificationService.success('Sukces', 'Dodano nowy artykuł');
    this.close.emit();
  }

  exitForm() {
    this.form.reset();
    this.close.emit();
  }
}
