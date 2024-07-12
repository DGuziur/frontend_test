import { Component, input } from '@angular/core';

@Component({
  selector: 'block-component',
  standalone: true,
  imports: [],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss',
})
export class BlockComponent {
  title = input<string>();
}
