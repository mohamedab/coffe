import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Order} from "../../shared/models/order";
import {OrderService} from "../../shared/services/order.service";
import {DialogService} from "../../shared/services/dialog.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'title', 'published', 'views', 'actions' ];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(public orderService:OrderService,
              public dialogService: DialogService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(res => {
      this.initDataSource(res);
    });
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource<Order>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public remove(Order:Order) {
    const index: number = this.dataSource.data.indexOf(Order);
    if (index !== -1) {
      const message = 'Êtes-vous sûr de supprimer cette commande ?';
      let dialogRef = this.dialogService.openConfirmDialog('', message);
			dialogRef.afterClosed().subscribe(dialogResult => {
				if(dialogResult){
          this.dataSource.data.splice(index,1);
          this.initDataSource(this.dataSource.data);
				}
			});
    }
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
