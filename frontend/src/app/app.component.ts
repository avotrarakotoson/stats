import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Language, Licence } from 'src/models';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  languages$: Observable<Language[]>;

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

    this.dataService.getLanguages()
      .subscribe(languages => {
        const labels = languages.map(language => language.language);
        const data = languages.map(language => language.totalBytes);
      });
  }
}
