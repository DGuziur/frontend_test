import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectComponent } from '../shared/components/select/select.component';
import { AuthorService } from '../shared/services/author.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SelectComponent],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent {
  protected readonly authorService = inject(AuthorService);
}
