import { Component } from '@angular/core';

import { TopbarComponent } from '../../Admin/topbar/topbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TilesComponent } from '../../custom/tiles/tiles.component';
import { FooterComponent } from '../../custom/footer/footer.component';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [TopbarComponent, RouterOutlet, CommonModule, TilesComponent,FooterComponent],
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.scss',
})
export class AdminlayoutComponent {
  showTilesContainer: boolean = false;
  toggleTileContainer(): void {
    this.showTilesContainer = !this.showTilesContainer;
  }
}
