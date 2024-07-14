import { Component, inject, input } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'input-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  private readonly controlContainer = inject(ControlContainer);

  type = input<'text' | 'number'>('text');
  name = input.required<string>();
  controlName = input<string>('');

  get formGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }
}
