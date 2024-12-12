import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OrderComponent } from './components/Admin/order/order.component';
import { ProductsComponent } from './components/Admin/products/products.component';
import { SingleproductComponent } from './components/Admin/singleproduct/singleproduct.component';
import { CartsComponent } from './components/Admin/carts/carts.component';
import { UsersComponent } from './components/Admin/users/users.component';
import { SingleuserComponent } from './components/Admin/singleuser/singleuser.component';
import { AdminlayoutComponent } from './components/Layout/adminlayout/adminlayout.component';

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
        path: 'carts',
        component: CartsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'single-user',
        component: SingleuserComponent,
      },
    ],
  },
];
