import {Component} from '@angular/core';
import {Item} from "../../models/item";
import {OrderService} from "../../services/order.service";
import {ItemService} from "../../services/item.service";
import {Category} from "../../models/category";

@Component({
  selector: 'app-menu-one',
  templateUrl: './menu-one.component.html',
  styleUrls: ['./menu-one.component.scss']
})
export class MenuOneComponent {

  categories: Category[] = [];
  activeMenuList: Item[] = [];

  itemId: number = 0;

  showSpinner: boolean = true;

  constructor(private cartService: OrderService,
              private itemService: ItemService) {
    this.itemService.getCategoriesFormJson().subscribe((categories: Category[]) => {
      this.categories = categories;
      // Show the first menu
      if (this.categories.length > 0) {
        this.activeMenuList = this.categories[0].items;
        this.categories[0].active = true;
      }
      this.showSpinner = false;
    }, error => {
      console.log(error);
      this.showSpinner = false;
    });
  }

  showActiveTab(category: Category) {
    this.activeMenuList = category.items;
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

}
