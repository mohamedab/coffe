import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "./services/firebase.service";
import {ItemService} from "./services/item.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private firebaseService: FirebaseService,
              private itemService: ItemService) {
  }

  ngOnInit(): void {
   // this.initializeDatabase();
  }

  initializeDatabase(): void {
    this.itemService.getItemsFormJson().subscribe(items => {
      this.itemService.addItems(items);
    });
  }
}
