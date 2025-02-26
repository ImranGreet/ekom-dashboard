import { CommonModule } from '@angular/common';
import { Component,Input,Output,TemplateRef,ContentChild,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-xenmeshlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xenmeshlist.component.html',
  styleUrl: './xenmeshlist.component.scss'
})
export class XenmeshlistComponent {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() customStyles: { [key: string]: string } = {};
  @Output() rowClicked = new EventEmitter<any>(); // Output for row click event

  @ContentChild('headerTemplate', { static: false }) headerTemplateRef!: TemplateRef<any>;
  @ContentChild('rowTemplate', { static: false }) rowTemplateRef!: TemplateRef<any>;

  onRowClick(rowData: any): void {
    this.rowClicked.emit(rowData);
  }
}


