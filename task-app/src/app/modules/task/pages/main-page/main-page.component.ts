import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header-component/header-component.component';
import { BlockComponent } from '../../components/radio-block/block.component';
import { RadioComponent } from '../../../../shared/components/radio/radio.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, BlockComponent, RadioComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  a: string = 'lol';
  x: string = 'xd';
  d: string = 'ok';
  text: string =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  texts: string[] = [this.text];
}
