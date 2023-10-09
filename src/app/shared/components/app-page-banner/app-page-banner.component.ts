import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-app-page-banner',
  templateUrl: './app-page-banner.component.html',
  styleUrls: ['./app-page-banner.component.scss']
})
export class AppPageBannerComponent {

  @Input({ required: true }) title: string = '';
  @Input({ required: true }) subTitle: string = '';
  @Input({ required: true }) imageUrl: string = 'url(assets/images/banner/bnr1.jpeg)';

  public constructor() {
  }

}
