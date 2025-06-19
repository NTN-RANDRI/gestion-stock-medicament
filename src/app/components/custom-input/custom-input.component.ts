import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() class = ''

  protected value: string = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  protected onInput(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(newValue);
  }

  protected onBlur(): void {
    this.onTouched();
  }

  // ----- ControlValueAccessor Methods -----
  writeValue(value: string): void {
    console.log('writeValue : ' + value);
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
