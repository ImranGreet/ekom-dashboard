import { Component } from '@angular/core';
import { XenmeshlistComponent } from '../../custom/xenmeshlist/xenmeshlist.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tablecontainer',
  standalone: true,
  imports: [XenmeshlistComponent,CommonModule],
  templateUrl: './tablecontainer.component.html',
  styleUrl: './tablecontainer.component.scss'
})
export class TablecontainerComponent {
  tableData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Sam Green', age: 35 }
  ];

  columns = ['id', 'name', 'age'];

  customStyles = {
    'background-color': '#f9f9f9',
    'border-radius': '8px',
    'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  onRowClick(rowData: any): void {
    console.log('Row clicked in parent:', rowData);
  }
}
