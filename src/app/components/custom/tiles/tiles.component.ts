import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [RouterLink,IconField,InputIcon],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.scss'
})
export class TilesComponent {

}
