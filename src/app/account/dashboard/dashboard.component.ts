import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {OrderService} from "../../shared/services/order.service";
import {Subscription} from "rxjs";
import {OrderStatus} from "../../shared/models/order-status";
import {DateRange} from "../../shared/models/date-range";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public barChartPlugins = [];
  public barChartLegend = true;
  public barChartData: ChartConfiguration<'bar'>['data'];
  public barChartData1: ChartConfiguration<'bar'>['data'];
  private barChartSuscription: Subscription = new Subscription();
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {responsive: true};
  showSpinner: boolean = false;


  public lineChartLegend = true;
  public lineChartOptions: ChartOptions<'line'> = {responsive: true};
  public lineChartData: any | ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };


  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getOrdersWithinDaysRange();
    this.getOrdersWithinBiMonthlyRange();
  }

  getOrdersWithinDaysRange(): void {
    // Fetch orders within the last 7 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const dateRanges: DateRange[] = [{startDate, endDate}];
    this.showSpinner = true;

    // Fetch orders with status "PENDING" and "CONFIRMED" within the date range
    this.barChartSuscription = this.orderService.getOrdersWithinDateRanges(dateRanges).subscribe((orders) => {
      const pendingOrders = orders.filter(order => order.status === OrderStatus.Pending);
      const confirmedOrders = orders.filter(order => order.status === OrderStatus.Confirmed);

      const dateLabels = this.getDateLabels(startDate, endDate);
      const dates = this.getDates(startDate, endDate);

      this.barChartData = {
        labels: dateLabels,
        datasets: [
          {
            label: OrderStatus.Pending,
            data: this.getCountByDate(dates, pendingOrders),
            backgroundColor: 'orange'
          },
          {
            label: OrderStatus.Confirmed,
            data: this.getCountByDate(dates, confirmedOrders),
            backgroundColor: 'green'
          }
        ]
      };
      this.showSpinner = false;
    }, error => {
      console.log(error);
      this.showSpinner = false;
    });
  }

  getOrdersWithinBiMonthlyRange() {
    const dateRanges: DateRange[] = this.calculateBiMonthlyDateRanges(7);
    this.showSpinner = true;
    // Fetch orders within the last 7 fortnights
    this.orderService.getOrdersWithinDateRanges(dateRanges).subscribe((orders) => {
      const pendingOrders = orders.filter(order => order.status === OrderStatus.Pending);
      const confirmedOrders = orders.filter(order => order.status === OrderStatus.Confirmed);
      const labels = dateRanges.map(dateRange => this.formatDateRange(dateRange));

      this.barChartData1 = {
        labels: labels,
        datasets: [
          {
            label: OrderStatus.Pending,
            data: this.getCountByDateRange(dateRanges, pendingOrders),
            backgroundColor: 'orange'
          },
          {
            label: OrderStatus.Confirmed,
            data: this.getCountByDateRange(dateRanges, confirmedOrders),
            backgroundColor: 'green'
          }
        ]
      };
      this.showSpinner = false;
    }, error => {
      console.log(error);
      this.showSpinner = false;
    });
  }

  // Define a DateRange type to store the start and end dates for each fortnight
  private calculateBiMonthlyDateRanges(count: number): DateRange[] {
    const today = new Date();
    const dateRanges: DateRange[] = [];

    for (let i = 0; i < count; i++) {
      const endDate = new Date(today);
      const startDate = new Date(endDate);

      if (endDate.getDate() <= 15) {
        // La date actuelle est dans la première quinzaine du mois
        endDate.setDate(15);
        startDate.setDate(1);
      } else {
        // La date actuelle est dans la deuxième quinzaine du mois
        const lastDayOfMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
        endDate.setDate(lastDayOfMonth.getDate());
        startDate.setDate(16);
      }

      dateRanges.push({startDate, endDate});

      // Reculez d'un mois
      today.setDate(today.getDate() - 15);
    }

    return dateRanges.reverse(); // Inverser l'ordre pour avoir les plus anciennes en premier

  }

  // Format the date range for labels (e.g., "2022-01-01 to 2022-01-14")
  private formatDateRange(dateRange: DateRange): string {
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;

    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('default', {month: 'long'});
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString('default', {month: 'long'});

    let formattedDateRange: string;

    if (startDay === 1) {
      formattedDateRange = `1er ${startMonth}`;
    } else {
      formattedDateRange = `16 ${startMonth}`;
    }

    formattedDateRange += ` au ${endDay} ${endMonth}`;

    return formattedDateRange;
  }

  private getCountByDateRange(dateRanges: DateRange[], orders: any[]): number[] {
    return dateRanges.map(dateRange => {
      return orders.filter(order => {
        const orderDate = order.orderDate.toDate();
        return orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;
      }).length;
    });
  }


  private getDateLabels(startDate: Date, endDate: Date): string[] {
    const days: string[] = [];
    let currentDate = new Date(startDate);

    const daysOfWeek = [
      'dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'
    ];

    while (currentDate <= endDate) {
      const dayOfWeek = daysOfWeek[currentDate.getDay()]; // Obtenez le nom du jour de la semaine
      days.push(dayOfWeek);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }

  private getDates(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  private getCountByDate(dates: string[], orders: any[]): number[] {
    return dates.map(date => orders.filter(order => order.orderDate.toDate().toISOString().split('T')[0] === date).length);
  }

  ngOnDestroy(): void {
    if (this.barChartSuscription) {
      this.barChartSuscription.unsubscribe();
    }
  }

}
