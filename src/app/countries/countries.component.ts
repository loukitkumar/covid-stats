import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable,of } from "rxjs";
import { GlobalDataSummary } from "../model";
import { map } from 'rxjs/operators'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private service:DataService) { }

  Countries:string[]=[];
  Country={
  ActiveCases:'0',
  LastUpdate:'0',
  NewCases:'0',
  NewDeaths:'0',
  TotalCases:0,
  TotalDeaths:0,
  TotalRecovered:0,
  };
  resultData:any[]=[];
  ngOnInit(): void {
    this.service.getData()
    .subscribe(
      r=>
      {
        let result=r.slice(1,r.length-1);
        this.resultData=result;
      result.forEach((cs:any) => {
        this.Countries.push(cs['Country_text']);
      });
      this.updateValues(this.resultData[0]['Country_text']);
      }
    )

    console.log(this.Countries);
  }
  updateValues(input:string)
  {
       this.resultData.forEach((element:any) => {
         if(element['Country_text']==input)
         {
              this.Country.ActiveCases=element['Active Cases_text'];
              this.Country.LastUpdate=element['Last Update'];
              this.Country.NewCases=element['New Cases_text'];
              this.Country.NewDeaths=element['New Deaths_text'];
              this.Country.TotalCases=Number(element['Total Cases_text'].replace(/[^\d\.\-eE+]/g, ""));
              this.Country.TotalRecovered=Number(element['Total Recovered_text'].replace(/[^\d\.\-eE+]/g, ""));
              this.Country.TotalDeaths=Number(element['Total Deaths_text'].replace(/[^\d\.\-eE+]/g, ""));

         }
       });
       console.log(this.Country);
  }
}
