import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Article } from '../types/article.type';
import { DEFAULT_ARTICLES } from '../config/default-articles.config';
import { NotificationService } from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  allArticles = signal<Article[]>([]);
  usedArticles = signal<Article[]>([]);
  private readonly notificationService = inject(NotificationService);

  avaliableArticles = computed<Article[]>(() =>
    this.allArticles().filter(
      (article) => !this.usedArticles().includes(article)
    )
  );

  sortArticles(articles: Article[]): Article[] {
    return articles.sort((first, second) =>
      first.title.localeCompare(second.title)
    );
  }

  addNewArticle(newArticle: Article): void {
    this.allArticles.update((oldArticles) => [...oldArticles, newArticle]);
  }

  replaceAllSelectedWith(newArticle: Article | null): void {
    if (!newArticle) {
      return this.notificationService.error('Błąd', 'Nie wybrano artykułu');
    }
    this.usedArticles.set([newArticle]);
  }

  readArticle(article: Article | null): void {
    if (!article) {
      return this.notificationService.error('Błąd', 'Nie wybrano artykułu');
    }
    this.usedArticles.update((oldArticles) => [...oldArticles, article]);
    this.usedArticles.set(this.sortArticles(this.usedArticles()));
  }

  deleteArticleWithIndex(index: number): void {
    this.allArticles.update((articles) => articles.splice(index, 1));
  }

  editArticleWithIndex(index: number, newValue: Article): void {
    this.allArticles()[index] = newValue;
  }

  getRandomUnusedArticle(): Article {
    const randomIndex = Math.floor(
      Math.random() * this.avaliableArticles().length
    );

    return this.avaliableArticles()[randomIndex];
  }

  saveArticlesToLocalStorage(): void {
    localStorage.setItem('allArticles', JSON.stringify(this.allArticles()));
    localStorage.setItem('usedArticles', JSON.stringify(this.usedArticles()));
  }

  getArticlesFromLocalStorage(): void {
    console.log(localStorage.getItem('allArticles') ?? '');
  }

  resetArticles(): void {
    this.allArticles.set(DEFAULT_ARTICLES);
    this.usedArticles.set([]);
  }
}
