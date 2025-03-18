import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  imports: [RouterLink, IconField, InputIcon, DragDropModule], // Import DragDropModule here
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent {
  linkGroups: LinkGroup[] = [
    {
      name: 'Group 1',
      links: [
        { name: 'Google', url: 'https://google.com' },
        { name: 'Angular', url: 'https://angular.io' }
      ]
    },
    {
      name: 'Group 2',
      links: [
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com' }
      ]
    }
  ];

  unassignedLinks: Link[] = [
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'Twitter', url: 'https://twitter.com' }
  ];

  drop(event: CdkDragDrop<Link[]>, group: LinkGroup | null) {
    if (event.previousContainer === event.container) {
      // Reorder within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  closeModal() {
    // Add logic to close the modal (e.g., hide it or navigate away)
    console.log('Modal closed');
  }
}
