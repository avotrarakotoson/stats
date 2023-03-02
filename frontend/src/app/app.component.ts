import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Language, Licence } from 'src/models';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  licences$: Observable<Licence[]>;
  languages$: Observable<Language[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.licences$ = this.dataService.getLicences();
    this.languages$ = this.dataService.getLanguages();
  }

  title = 'stats';
}
