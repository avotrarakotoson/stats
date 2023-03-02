import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { debounceTime } from 'rxjs';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageComponent implements OnInit {
  limit: number = 5;
  search = '';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  barChartType: ChartType = 'pie';
  public languagesChartData: ChartData<ChartType> = {
    labels: [],
    datasets: []
  };

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
  ) {}

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

  onLimitChange() {
    this.dataService.getLanguages({ limit: this.limit })
      .subscribe(licences => {
        const labels = licences.map(licence => licence.language);
        const data = licences.map(licence => licence.totalBytes);

        this.languagesChartData.labels = labels;
        this.languagesChartData.datasets.push({ data });
        this.chart?.update();
      });
  }

  onSearch() {
    this.dataService.getLanguages({ keyword: this.search, limit: this.limit })
      .pipe(
        debounceTime(500)
      )
      .subscribe(licences => {
        const labels = licences.map(licence => licence.language);
        const data = licences.map(licence => licence.totalBytes);

        this.languagesChartData.labels = labels;
        this.languagesChartData.datasets.push({ data });
        this.chart?.update();
      });
  }

  onChartTypeChange($event: any) {
    this.barChartType = $event.target.value;
  }

  getOptions(type: ChartType): ChartConfiguration['options'] {
    if (type === 'bar') {
      return {
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
    }

    return {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right',
        },
      }
    }
  }
}
