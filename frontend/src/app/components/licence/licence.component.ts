import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.css']
})
export class LicenceComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    }
  };
  licencesChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: []
  };
  pieChartType: ChartType = 'pie';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getLicences()
      .subscribe(licences => {
        const labels = licences.map(licence => licence.license);
        const data = licences.map(licence => licence.total);

        this.licencesChartData.labels = labels;
        this.licencesChartData.datasets.push({ data });
        this.chart?.update();
      });
  }
}
