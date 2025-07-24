import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
})
export class ButtonComponent {
  /**
   * Text to display on the button.
   */
  @Input() label: string = 'Click Me';

  /**
   * If true, disables the button.
   */
  @Input() disabled: boolean = false;

  /**
   * Button style variant: 'primary' | 'secondary' | 'danger'
   */
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  /**
   * Emits when button is clicked.
   */
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
