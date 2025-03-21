import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

interface Link {
  name: string;
  url: string;
}

interface LinkGroup {
  name: string;
  links: Link[];
}

@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [RouterLink, IconField, InputIcon, DragDropModule,CommonModule], // Import DragDropModule here
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent {

  isOpen = false;
  apps = ['App 1', 'App 2', 'App 3', 'App 4'];
  folders: { name: string, items: string[] }[] = [];

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  createFolder() {
    this.folders.push({ name: `Folder ${this.folders.length + 1}`, items: [] });
  }

}
