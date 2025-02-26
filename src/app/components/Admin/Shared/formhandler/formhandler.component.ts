import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-formhandler',
  standalone: true,
  imports: [CommonModule,FormsModule,InputTextModule],
  templateUrl: './formhandler.component.html',
  styleUrl: './formhandler.component.scss',

})
export class FormhandlerComponent  implements OnInit {
  @Input() fields: { label: string; model: string }[] = [];
  @Input() modelData: any = {};

  @Output() save = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();

  formData: any = {};

  inputTypes: { [key: string]: string } = {};
  lockedTypes: { [key: string]: boolean } = {};


  ngOnInit() {

    this.formData = { ...this.modelData };

    for (const field of this.fields) {
      const modelValue = this.modelData[field.model] || '';
      this.inputTypes[field.model] = this.getInputType(modelValue);
      this.lockedTypes[field.model] = true;
    }
  }

  getInputType(value: any): string {
    if (typeof value === 'string' && value.includes('@')) return 'email';
    if (!isNaN(value) && value !== '') return 'number';
    if (typeof value === 'string' && value.match(/\.(jpg|jpeg|png|gif|pdf)$/i)) return 'file';
    return 'text';
  }


  saveData() {
    this.save.emit(this.formData);
  }

  updateData() {
    this.update.emit(this.formData);
  }

}


