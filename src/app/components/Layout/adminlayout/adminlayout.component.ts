import { Component } from '@angular/core';
import { SidebarComponent } from '../../Admin/sidebar/sidebar.component';
import { TopbarComponent } from '../../Admin/topbar/topbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterOutlet, CommonModule],
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.scss',
})
export class AdminlayoutComponent {}
