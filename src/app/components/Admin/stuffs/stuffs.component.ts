import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
/*prime ng module*/
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { FileUpload } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { InputNumber } from 'primeng/inputnumber';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Paginator } from 'primeng/paginator';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { Textarea } from 'primeng/textarea';
import { Skeleton } from 'primeng/skeleton';

/*service or api*/
import { ConfirmationService, MessageService } from 'primeng/api';
import { StuffService } from '../../../services/stuff.service';

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
  selected?: boolean;
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
    Checkbox,
    IconField,
    InputIcon,
    InputText,
    Paginator,
    FormsModule,
    DatePickerModule,
    ToastModule,
    Textarea,
    Skeleton,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './stuffs.component.html',
  styleUrl: './stuffs.component.scss',
})
export class StuffsComponent implements OnInit {
  @ViewChild('stuffForm') stuffForm!: NgForm;

  constructor(
    private stuffService: StuffService,
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}

  ourStuffs: Stuff[] = [];
  cols!: Column[];
  showDialog: boolean = false;
  first: number = 0;
  rows: number = 10;
  total: number = 0;
  currentPage: number = 1;
  perPage = 20;
  searchTerm: string = '';

  products: any[] | undefined;

  stuff: Stuff = {
    id: 0,
    name: '',
    position: '',
    start_from: '',
    contact_normal: '',
    address: '',
    salary_wages: 0,
    benifits: '',
    vacation_peroid: 0,
    training_records: '',
    contact_emergency: '',
    notes: '',
    created_at: '',
    updated_at: '',
  };

  ngOnInit() {
    this.loadStuffs(this.currentPage, this.perPage);
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'position', header: 'Position' },
      { field: 'contact_emergency', header: 'Contact emergency' },
      { field: 'training_records', header: 'Training Records' },
      { field: 'vacation_peroid', header: 'Vacation Peroid' },
      { field: 'salary_wages', header: 'Salary Wages' },
    ];
  }

  loadStuffs(page: number, perPage: number) {
    this.http
      .get<StuffsResponse>(
        `http://127.0.0.1:8000/api/our_stuffs?page=${page}&per_page=${perPage}`
      )
      .subscribe((response) => {
        this.ourStuffs = response.stuffs.data;
        this.total = response.stuffs.total;
        this.currentPage = response.stuffs.current_page;
        this.first = (this.currentPage - 1) * this.rows;
      });
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.first = event.first;
    this.rows = event.rows;
    this.perPage = this.rows;
    this.loadStuffs(this.currentPage, this.rows);
  }

  openNew() {
    this.resetStuffForm();
    this.showDialog = true;
  }

  resetStuffForm() {
    this.stuff = {
      id: 0,
      name: '',
      position: '',
      start_from: '',
      contact_normal: '',
      address: '',
      salary_wages: 0,
      benifits: '',
      vacation_peroid: 0,
      training_records: '',
      contact_emergency: '',
      notes: '',
      created_at: '',
      updated_at: '',
    };
  }



  createNewStuff() {
    if (this.stuffForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill all required fields.',
      });
      return;
    }

    const newStuffData = {
      name: this.stuff.name,
      position: this.stuff.position,
      start_from: this.stuff.start_from,
      contact_normal: this.stuff.contact_normal,
      address: this.stuff.address,
      salary_wages: this.stuff.salary_wages,
      benifits: this.stuff.benifits,
      vacation_peroid: this.stuff.vacation_peroid,
      training_records: this.stuff.training_records,
      contact_emergency: this.stuff.contact_emergency,
      notes: this.stuff.notes,
    };

    this.http
      .post<{ message: string; stuff: Stuff }>(
        'http://127.0.0.1:8000/api/our_stuffs',
        newStuffData
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          this.loadStuffs(this.currentPage, this.rows);
          this.showDialog = false;
          this.resetStuffForm();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create new stuff. Please try again.',
          });
          console.error('Error creating new stuff:', error);
        },
      });
  }

  editStuff(id: number) {
    this.http
      .get<{ message: string; stuff: Stuff }>(
        `http://127.0.0.1:8000/api/our_stuffs/${id}/edit`
      )
      .subscribe({
        next: (response) => {
          this.stuff = response.stuff;
          this.showDialog = true;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch stuff details for editing.',
          });
          console.error('Error fetching stuff details:', error);
        },
      });
  }

  updateStuff() {
    if (this.stuffForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill all required fields.',
      });
      return;
    }

    const updatedStuff = {
      name: this.stuff.name,
      position: this.stuff.position,
      start_from: this.stuff.start_from,
      contact_normal: this.stuff.contact_normal,
      address: this.stuff.address,
      salary_wages: this.stuff.salary_wages,
      benifits: this.stuff.benifits,
      vacation_peroid: this.stuff.vacation_peroid,
      training_records: this.stuff.training_records,
      contact_emergency: this.stuff.contact_emergency,
      notes: this.stuff.notes,
    };

    this.http
      .put(
        `http://127.0.0.1:8000/api/our_stuffs/${this.stuff.id}`,
        updatedStuff
      )
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Stuff updated successfully!',
          });
          this.loadStuffs(this.currentPage, this.rows);
          this.showDialog = false;
          this.resetStuffForm();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update stuff. Please try again.',
          });
          console.error('Error updating stuff:', error);
        },
      });
  }

  deleteSelectedStuff(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Stuff?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http
          .delete(`http://127.0.0.1:8000/api/our_stuffs/${id}`)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Stuff deleted successfully!',
              });
              this.loadStuffs(this.currentPage, this.rows);
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete stuff. Please try again.',
              });
              console.error('Error deleting stuff:', error);
            },
          });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Deletion cancelled.',
        });
      },
    });
  }

  getSelectedStuffIds(): number[] {
    return this.ourStuffs
      .filter((stuff) => stuff.selected)
      .map((stuff) => stuff.id);
  }

  deleteMultipleStuff() {
    const selectedIds = this.getSelectedStuffIds();

    if (selectedIds.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Selection',
        detail: 'Please select at least one stuff to delete.',
      });
      return;
    }

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected stuffs?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http
          .delete('http://127.0.0.1:8000/api/our_stuffs', {
            body: { ids: selectedIds },
          })
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Selected stuffs deleted successfully!',
              });
              this.loadStuffs(this.currentPage, this.rows);
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete selected stuffs. Please try again.',
              });
              console.error('Error deleting stuffs:', error);
            },
          });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Deletion cancelled.',
        });
      },
    });
  }

  isAnyCheckboxSelected(): boolean {
    return this.ourStuffs.some((stuff) => stuff.selected);
  }

  onCheckboxChange() {
    this.cdr.detectChanges();
  }

  onSearch() {
    if (!this.searchTerm) {
      this.loadStuffs(this.currentPage, this.perPage);
      return;
    }

    const filteredStuffs = this.ourStuffs.filter((stuff) =>
      Object.values(stuff).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );

    this.ourStuffs = filteredStuffs;
  }
}
