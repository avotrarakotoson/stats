import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    }
  };
  barChartType: ChartType = 'bar';
  public languagesChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getLanguages()
      .subscribe(licences => {
        const labels = licences.map(licence => licence.language);
        const data = licences.map(licence => licence.totalBytes);

        this.languagesChartData.labels = labels;
        this.languagesChartData.datasets.push({ data });
        this.chart?.update();
      });
  }

}
