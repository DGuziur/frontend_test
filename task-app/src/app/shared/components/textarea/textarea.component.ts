import { Component, inject, input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'textarea-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  private readonly controlContainer = inject(ControlContainer);
  name = input.required<string>();
  controlName = input<string>('');

  get formGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }
}
