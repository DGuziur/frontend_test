import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header-component/header-component.component';
import { BlockComponent } from '../../components/radio-block/block.component';
import { RadioComponent } from '../../../../shared/components/radio/radio.component';
import { ArticlesService } from '../../services/articles.service';
import { FormsModule } from '@angular/forms';
import { Article } from '../../types/article.type';
import { DEFAULT_ARTICLES } from '../../config/default-articles.config';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, BlockComponent, RadioComponent, FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  protected readonly articlesService = inject(ArticlesService);
  protected readonly minForRandomSelect: number = 2;
  notification = inject(NotificationService);
  selectedArticle = signal<Article | null>(null);
  randomArticle = signal<boolean>(false);

  ngOnInit(): void {
    this.articlesService.allArticles.set(DEFAULT_ARTICLES);
  }

  getRandomUnusedArticle(): void {
    this.selectedArticle.set(this.articlesService.getRandomUnusedArticle());
    this.randomArticle.set(true);
  }

  replaceAllWithSelected(): void {
    this.articlesService.replaceAllSelectedWith(this.selectedArticle());
    this.selectedArticle.set(null);
    this.randomArticle.set(false);
  }

  readArticle(): void {
    this.articlesService.readArticle(this.selectedArticle());
    this.selectedArticle.set(null);
    this.randomArticle.set(false);
  }

  isRandomAvaliable(): boolean {
    return (
      this.articlesService.avaliableArticles().length >= this.minForRandomSelect
    );
  }
}
