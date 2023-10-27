import {Component} from '@angular/core';
import {Item} from "../../models/item";
import {OrderService} from "../../services/order.service";
import {ItemService} from "../../services/item.service";
import {Category} from "../../models/category";
import {SwiperConfigInterface} from "../swiper/swiper.module";

@Component({
  selector: 'app-menu-one',
  templateUrl: './menu-one.component.html',
  styleUrls: ['./menu-one.component.scss']
})
export class MenuOneComponent {

  categories: Category[] = [];
  activeMenuList: Item[] = [];
  public config: SwiperConfigInterface = {};
  clients = [
    {name: 'aloha', image: 'assets/images/clients/aloha.png'},
    {name: 'dream', image: 'assets/images/clients/dream.png'},
    {name: 'congrats', image: 'assets/images/clients/congrats.png'},
    {name: 'best', image: 'assets/images/clients/best.png'},
    {name: 'original', image: 'assets/images/clients/original.png'},
    {name: 'retro', image: 'assets/images/clients/retro.png'},
    {name: 'king', image: 'assets/images/clients/king.png'},
    {name: 'love', image: 'assets/images/clients/love.png'},
    {name: 'the', image: 'assets/images/clients/the.png'},
    {name: 'easter', image: 'assets/images/clients/easter.png'},
    {name: 'with', image: 'assets/images/clients/with.png'},
    {name: 'special', image: 'assets/images/clients/special.png'},
    {name: 'bravo', image: 'assets/images/clients/bravo.png'}
  ];


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

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: {nextEl: '.prop-next', prevEl: '.prop-prev'},
      pagination: true,
      grabCursor: true,
      loop: true,
      preloadImages: true,
      lazy: false,
      breakpoints: {
        320: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        },
        960: {
          slidesPerView: 4
        },
        1280: {
          slidesPerView: 5
        }
      }
    }
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
