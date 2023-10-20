import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../shared/services/order.service";
import {Item} from "../../shared/models/item";
import {Order} from "../../shared/models/order";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../../shared/services/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderStatus} from "../../shared/models/order-status";
import {Category} from "../../shared/models/category";
import {ItemService} from "../../shared/services/item.service";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  order: Order = null;
  tableNumber = null;
  selectedServer = '';
  servers: string[] = ['Server 1', 'Server 2', 'Server 3']; // Replace with your list of servers
  showSpinner: boolean = false;
  selecedItemsNbr!: number;
  isOrderConfirmed: boolean = false;
  showTotalPriceBar: boolean = false;


  categories: Category[] = [];
  items: Item[] = [];

  constructor(private orderService: OrderService,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.itemService.getCategoriesFormJson()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        // Show the first menu
        if (this.categories.length > 0) {
          this.items = this.categories[0].items;
          this.categories[0].active = true;
        }
      }, error => {
        console.log(error);
      });
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

  showActiveTab(category: Category) {
    this.items = category.items;
    this.categories.forEach((cat) => {
      cat.active = false; // Deactivate all categories
    });
    category.active = true; // Activate the selected category
  }

  // Generate a unique itemId for each item
  generateUniqueId(): string {
    // Generate a random 12-character alphanumeric string
    return Math.random().toString(36).substring(2, 14);
  }

  scrollToTabContent() {
    const element = document.getElementById('tab-content');
    if (element) {
      // Scroll to the target element using either of the methods below
      element.scrollIntoView({behavior: 'smooth', block: "start", inline: "center"});
    }
  }

  addToCart(item: any) {
    const existingItem = this.order.items.find((orderItem) => orderItem.itemId === item.itemId);

    if (existingItem) {
      // If the item already exists in the order, update the quantity
      existingItem.quantity += 1;
    } else {
      // If it's a new item, add it to the order
      const newItem: Item = {...item, quantity:1};
      this.order.items.push(newItem);
    }
    this.selecedItemsNbr = this.order.items.reduce((acc, item) => acc + parseInt(String(item.quantity), 10), 0);
    this.calculateTotalAmount();
  }
}
