import { Component, OnInit } from '@angular/core';
import { StuffService } from '../../../services/stuff.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { FileUpload } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { InputNumber } from 'primeng/inputnumber';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Checkbox } from 'primeng/checkbox';

interface Stuff {
  id: number;
  name: string;
  position: string;
  start_from: string;
  contact_normal: string;
  address: string;
  salary_wages: number;
  benifits: string;
  vacation_peroid: number;
  training_records: string;
  contact_emergency: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

interface StuffsResponse {
  message: string;
  stuffs: {
    current_page: number;
    data: Stuff[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLinks[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-stuffs',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    Toolbar,
    FileUpload,
    DialogModule,
    SelectModule,
    RadioButton,
    InputNumber,
    ConfirmDialog,
    Checkbox
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './stuffs.component.html',
  styleUrl: './stuffs.component.scss',
})
export class StuffsComponent implements OnInit {
  constructor(private stuffService: StuffService,
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,


  ) {}

  ourStuffs: Stuff[] = [];
  cols!: Column[];
  showDialog: boolean = false;

  ngOnInit() {
    this.http
      .get<StuffsResponse>(`http://127.0.0.1:8000/api/our_stuffs`)
      .subscribe((response) => {
        this.ourStuffs = response.stuffs.data;
        console.log(this.ourStuffs, 'stuff');
      });
    this.cols = [

      { field: 'name', header: 'Name' },
      { field: 'position', header: 'Position' },
      { field: 'contact_emergency', header: 'Contact emergency' },
      { field: 'training_records', header: 'Training Records' },
      { field: 'vacation_peroid', header: 'Vacation Peroid' },
      { field: 'salary_wages', header: 'Salary Wages' },
    ];
  }

  openNew() {
    this.showDialog = true;
  }

  editStuff() {
    this.showDialog = true;
  }

  deleteSelectedStuff() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
    });
  }
}
