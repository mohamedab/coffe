import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Order} from "../../shared/models/order";
import {OrderService} from "../../shared/services/order.service";
import {DialogService} from "../../shared/services/dialog.service";
import {OrderStatus} from "../../shared/models/order-status";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'status', 'orderDate', 'totalAmount', 'actions'];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  orders: Order[] = [];

  constructor(public orderService: OrderService,
              public dialogService: DialogService) {
  }

  ngOnInit() {
    this.getPendingOrders();
  }

  private getPendingOrders() {
    this.orderService.getPendingOrders().subscribe((data: Order[]) => {
      this.orders = data.map((order: Order) => {
        const date: any = order.orderDate;
        order.orderDate = date.toDate();
        return order;
      });
      this.initDataSource(this.orders);
    });
  }

  public initDataSource(data: Order[]) {
    this.dataSource = new MatTableDataSource<Order>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public cancel(order: Order) {
    this.orderService.updateOrderStatusDoc(order.orderId, OrderStatus.Canceled)
      .then(() => {
          console.log('canceled');
          this.getPendingOrders();
        }
      ).catch(err => console.log(err));
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
