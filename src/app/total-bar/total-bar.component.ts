import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-total-bar',
  templateUrl: './total-bar.component.html',
  styleUrls: ['./total-bar.component.scss']
})
export class TotalBarComponent {

  @Input() totalPrice: number = 0;
}
