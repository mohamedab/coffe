import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../shared/services/order.service";
import {Item} from "../../shared/models/item";
import {Order} from "../../shared/models/order";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../../shared/services/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderStatus} from "../../shared/models/order-status";
import {EMPTY, of, Observable} from "rxjs";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  items: Observable<Item[]> = EMPTY;
  order: Order = null;
  tableNumber = null;
  selectedServer = '';
  servers: string[] = ['Server 1', 'Server 2', 'Server 3']; // Replace with your list of servers
  showSpinner: boolean = false;
  selecedItemsNbr!: number;
  isOrderConfirmed: boolean = false;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      if (data) {
        const order: Order = data['order'];
        this.order = order;
        this.selecedItemsNbr = order.items.reduce((acc, item) => acc + parseInt(String(item.quantity), 10), 0);
        this.isOrderConfirmed = this.order.status === OrderStatus.Confirmed;
      }
    });
  }

  goBack() {
    this.router.navigate(['account/orders/' + OrderStatus.Confirmed]);
  }


  confirmOrder(form: any) {
    if (form.valid && !this.isOrderConfirmed) {
      this.order.status = OrderStatus.Confirmed;
      this.order.updateDate = new Date();
      this.order.tableNumber = this.tableNumber;
      this.order.serverId = this.selectedServer;
      this.showSpinner = true;
      this.orderService.updateOrderDoc(this.order).then(() => {
          this._snackBar.open('Commande confirmée', '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });
          this.showSpinner = false;
          this.goBack();
        }
      ).catch(err => {
        console.log(err);
        this.showSpinner = false;
      });
    }
  }

  updateOrder(items: Item[]) {
    this.order.items = items;
    this.selecedItemsNbr = items.reduce((acc, item) => acc + parseInt(String(item.quantity), 10), 0);
    this.calculateTotalAmount();
  }

  private calculateTotalAmount(): void {
    const totalAmount = this.order.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const roundedNumberString = totalAmount.toFixed(2); // "29.48" as a string
    this.order.totalAmount = parseFloat(roundedNumberString);
  }

}
