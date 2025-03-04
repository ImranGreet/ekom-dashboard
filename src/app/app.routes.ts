import { Routes } from '@angular/router';
import { OrderComponent } from './components/Admin/order/order.component';
import { ProductsComponent } from './components/Admin/products/products.component';
import { SingleproductComponent } from './components/Admin/singleproduct/singleproduct.component';
import { UsersComponent } from './components/Admin/users/users.component';
import { AdminlayoutComponent } from './components/Layout/adminlayout/adminlayout.component';
import { ProductdetailsComponent } from './components/Admin/productdetails/productdetails.component';
import { ProductcustomizationComponent } from './components/Admin/productcustomization/productcustomization.component';
import { TransactionsComponent } from './components/Admin/transactions/transactions.component';
import { RolesComponent } from './components/Admin/roles/roles.component';
import { PermissionsComponent } from './components/Admin/permissions/permissions.component';
import { StuffsComponent } from './components/Admin/stuffs/stuffs.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminlayoutComponent,
    children: [
      {
        path: '',
        component: OrderComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },

      {
        path: 'single-product',
        component: SingleproductComponent,
      },

      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'product-details/:id',
        component: ProductdetailsComponent,
      },
      {
        path:'product-customization',
        component:ProductcustomizationComponent
      },
      {
        path:'transaction',
        component:TransactionsComponent
      },
      {
        path:'roles',
        component:RolesComponent
      },
      {
        path:'permissions',
        component:PermissionsComponent
      },
      {
        path:'our_stuff',
        component:StuffsComponent
      }

    ],
  },
];
