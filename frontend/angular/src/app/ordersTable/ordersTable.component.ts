import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrdersService } from './services/orders.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OrderInterface } from './orders.interface';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'orders-table',
  standalone: true,
  templateUrl: './ordersTable.component.html',
  styleUrls: ['./ordersTable.component.css'],
  imports: [
    MatTableModule,
    HttpClientModule,
    CommonModule,
    MatIcon,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    OrdersService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class OrdersTableComponent implements OnInit {
  public dataSource: any;
  public customerSearch: string = '';
  public statusSearch: string = '';
  public displayedColumns: string[] = [
    'id',
    'date',
    'customer',
    'address1',
    'city',
    'postcode',
    'country',
    'amount',
    'status',
    'deleted',
    'last_modified',
    'cancel',
  ];

  public statusOptions: { name: string; viewName: string }[] = [
    {
      name: 'in_production',
      viewName: 'In Production',
    },
    {
      name: 'pending',
      viewName: 'Pending',
    },
    {
      name: 'cancelled',
      viewName: 'Cancelled',
    },
  ];

  public validateStatus(status: string): string {
    switch (status) {
      case 'cancelled':
        return 'Cancelled';
      case 'in_production':
        return 'In Production';
      case 'pending':
        return 'Pending';
      default:
        return '';
    }
  }

  public cancelItem(event: MouseEvent): void {
    let id: string = (event.target as HTMLElement).id;

    this.ordersService.cancelItem(id).subscribe((apiReturn) => {
      if (apiReturn.status) {
        window.alert("It's not possible to cancel this item at this time.");
      }

      this.openSnackBar(`Item ${id} cancelled!`);
      this.fetchOrders();
    });
  }

  public fetchOrders(): void {
    this.ordersService.fetchOrders().subscribe((orders) => {
      this.dataSource = new MatTableDataSource<OrderInterface>(orders);
      this.dataSource.paginator = this.paginator;

      this.dataSource.filterPredicate = (
        data: OrderInterface,
        filter: { customer: string; status: string }
      ) => {
        let customerMatch = true;
        let statusMatch = true;

        if (filter.customer !== '') {
          customerMatch = data.customer.toLowerCase().includes(filter.customer);
        }

        if (filter.status !== '') {
          statusMatch = data.status.includes(filter.status);
        }

        return statusMatch && customerMatch;
      };
    });
  }

  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: any, filter: string) => {
      const textToSearch = (d[column] && d[column].toLowerCase()) || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public constructor(
    private ordersService: OrdersService,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', { duration: 3000 });
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  applyFilter() {
    const filterValue = {
      customer: this.customerSearch.trim().toLowerCase(),
      status: this.statusSearch.trim().toLowerCase(),
    };
    this.dataSource.filter = filterValue;
  }
}
