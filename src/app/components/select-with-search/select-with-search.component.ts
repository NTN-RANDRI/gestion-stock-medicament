import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, Input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-with-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-with-search.component.html',
  styleUrl: './select-with-search.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectWithSearchComponent),
      multi: true
    }
  ]
})
export class SelectWithSearchComponent implements ControlValueAccessor {
  @Input() className = '';
  @Input() placeholder = '';
  @Input({required: true}) options!: string[];

  // protected search = signal<string>('');
  // protected optionSelected: string = '';



  protected show: boolean = false;
  protected optionSelected = signal<string>('');
  protected optionsFilter = computed(() => this.filter());

  protected filter(): string[] {
    if (this.value().length === 0) {
      return [];
    }

    return this.options.filter(option =>
      option.toLowerCase().includes(this.value().trim().toLowerCase())
    );
  }

  protected changeSelected(option: string) {
    this.value.set(option);
    this.optionSelected.set(option);
    this.onChange(option);
  }

  private blur() {
    this.show = false;
    if (this.value().length === 0) {
      this.changeSelected('');
    } else {
      this.value.set(this.optionSelected());
    }
  }

  // ---------- config ---------------- //
  protected value = signal<string>('');

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  protected onInput(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value.set(newValue);
  }

  protected onBlur(): void {
    this.onTouched();
    this.blur();
  }

  // ----- ControlValueAccessor Methods -----
  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
