import { Injectable, signal } from '@angular/core';
import { Article } from '../types/article.type';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  allArticles = signal<Article[]>([]);
  usedArticles = signal<Article[]>([]);

  addNewArticle(newArticle: Article): void {
    this.allArticles.update((oldArticles) => [...oldArticles, newArticle]);
  }

  deleteArticleWithIndex(index: number): void {
    this.allArticles.update((articles) => articles.splice(index, 1));
  }

  editArticleWithIndex(index: number, newValue: Article): void {
    this.allArticles()[index] = newValue;
  }
}
