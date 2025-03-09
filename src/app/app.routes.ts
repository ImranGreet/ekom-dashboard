import {Routes} from '@angular/router';

import {ProductsComponent} from './components/Admin/products/products.component';
import {AdminlayoutComponent} from './components/Layout/adminlayout/adminlayout.component';
import {StuffsComponent} from './components/Admin/stuffs/stuffs.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminlayoutComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'our_stuff',
        component: StuffsComponent
      }
    ],
  },
];
