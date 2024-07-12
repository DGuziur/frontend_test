import { computed, effect, Injectable, signal } from '@angular/core';
import { Article } from '../types/article.type';
import { DEFAULT_ARTICLES } from '../config/default-articles.config';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  allArticles = signal<Article[]>([]);
  usedArticles = signal<Article[]>([]);

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
    if (newArticle) {
      this.usedArticles.set([newArticle]);
    }
  }

  readArticle(article: Article | null): void {
    if (article) {
      this.usedArticles.update((oldArticles) => [...oldArticles, article]);
    }
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
}
