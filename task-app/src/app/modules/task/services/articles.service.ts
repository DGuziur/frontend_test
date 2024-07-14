import {
  ChangeDetectorRef,
  computed,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { Article } from '../types/article.type';
import { NotificationService } from '../../../shared/services/notification.service';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly notificationService = inject(NotificationService);
  private readonly http = inject(HttpClient);
  allArticles = signal<Article[]>([]);
  usedArticles = signal<Article[]>([]);

  avaliableArticles = computed<Article[]>(() =>
    this.allArticles().filter((article) => {
      return !this.usedArticles().some((usedArticle) => {
        return JSON.stringify(usedArticle) === JSON.stringify(article);
      });
    })
  );

  getDefaultArticles(): void {
    this.http
      .get<Article[]>(`../../../../assets/default-articles.json`)
      .pipe(
        catchError((err) => {
          this.notificationService.error('Błąd', 'Błąd podczas pobierania');
          return of(err);
        })
      )
      .subscribe((res: Article[]) => {
        this.allArticles.set(res);
        this.saveToLocalStorage();
      });
  }

  saveToLocalStorage(): void {
    localStorage.setItem('allArticles', JSON.stringify(this.allArticles()));
    localStorage.setItem('usedArticles', JSON.stringify(this.usedArticles()));
  }

  sortArticles(articles: Article[]): Article[] {
    return articles.sort((first, second) =>
      first.title.localeCompare(second.title)
    );
  }

  addNewArticle(newArticle: Article): void {
    this.allArticles.update((oldArticles) => [...oldArticles, newArticle]);
    this.saveToLocalStorage();
  }

  replaceAllSelectedWith(newArticle: Article | null): void {
    if (!newArticle) {
      return this.notificationService.error('Błąd', 'Nie wybrano artykułu');
    }
    this.usedArticles.set([newArticle]);
    this.saveToLocalStorage();
  }

  readArticle(article: Article | null): void {
    if (!article) {
      return this.notificationService.error('Błąd', 'Nie wybrano artykułu');
    }
    this.usedArticles.update((oldArticles) => [...oldArticles, article]);
    this.usedArticles.set(this.sortArticles(this.usedArticles()));
    this.saveToLocalStorage();
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

  getArticles(): void {
    const all = localStorage.getItem('allArticles');
    const used = localStorage.getItem('usedArticles');
    if (!all?.length || !used?.length) {
      return this.getDefaultArticles();
    }
    const parsedUsed: Article[] = JSON.parse(used);
    const parsedAll: Article[] = JSON.parse(all);
    this.usedArticles.set(parsedUsed);
    this.allArticles.set(parsedAll);
  }

  resetArticles(): void {
    this.getDefaultArticles();
    this.usedArticles.set([]);
  }
}
