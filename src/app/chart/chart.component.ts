import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import StockTools from 'highcharts/modules/stock-tools';
import HC_exporting from 'highcharts/modules/exporting';
import { OhlcDataService } from '../ohlc-data.service';

StockTools(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterViewInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  chart!: Highcharts.Chart;

  constructor(private ohlcDataService: OhlcDataService) {
    this.chartOptions = {
      rangeSelector: {
        selected: 1,
      },
      title: {
        text: 'Live Candlestick Chart',
      },
      subtitle: {
        text: 'Using Highcharts and Angular',
      },
      stockTools: {
        gui: {
          enabled: true,
        },
      },
      series: [
        {
          type: 'candlestick',
          name: 'USD/EUR',
          data: [], // Data will be fetched and set in ngOnInit
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    };
  }

  ngAfterViewInit(): void {
    this.fetchData();
    setInterval(() => {
      this.fetchData();
    }, 10000); // Fetch new data every 10 seconds
  }

  fetchData(): void {
    this.ohlcDataService.getOhlcData().subscribe((data) => {
      console.log('Data in fetchData:', data);
      const seriesOptions: Highcharts.SeriesCandlestickOptions = {
        type: 'candlestick',
        name: 'USD/EUR',
        data: data,
        tooltip: {
          valueDecimals: 2,
        },
      };
      if (!this.chart) {
        this.chartOptions.series = [seriesOptions];
        this.chart = Highcharts.stockChart('container', this.chartOptions);
      } else {
        this.chart.update({
          series: [seriesOptions],
        });
      }
    });
  }
}
