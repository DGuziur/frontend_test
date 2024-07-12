import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectComponent } from '../shared/components/select/select.component';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [RouterOutlet, SelectComponent],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent {}
