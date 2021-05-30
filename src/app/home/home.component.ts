import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable,of } from "rxjs";
import { GlobalDataSummary } from "../model";
import { map } from 'rxjs/operators'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private service:DataService) { }

  totalCase:number=0;
  totalDeaths:number=0;
  totalRecovered:number=0;
  barChartOptions: ChartOptions = {
   responsive: true,
   scales: {
       xAxes: [{
           stacked: true
         }]}
   };
 barChartLabels: Label[] = [];
 barChartType: ChartType = 'bar';
 barChartLegend = true;
 barChartPlugins = [];
 public chartColors: Array<any> = [
    {
      backgroundColor:'rgba(54, 162, 235, 0.2)',

      borderColor:'rgba(54, 162, 235, 1)',

      borderWidth: 2
    },
    {
      backgroundColor:'rgba(54, 162, 35,0.1)',

      borderColor:'rgba(54, 162, 35, 1)',

      borderWidth: 2
    },
    {
      backgroundColor:'rgba(104, 40, 35, 1)',

      borderColor:'rgba(104, 40, 35, 1)',

      borderWidth: 2
    }
  ];
 barChartData: ChartDataSets[] = [
 ];
 mainData:GlobalDataSummary[]=[];


  ngOnInit(): void {
    this.service.getData()
    .subscribe(
      r=>{
        let result=r.slice(0,25);
        console.log(result);
      this.mainData= result.map((item:any)=>{

          return {
               Country_text:item['Country_text'],
               Total_Cases_text:Number(item['Total Cases_text'].replace(/[^\d\.\-eE+]/g, "")),
               Total_Deaths_text:Number(item['Total Deaths_text'].replace(/[^\d\.\-eE+]/g, "")),
               Total_Recovered_text: Number(item['Total Recovered_text'].replace(/[^\d\.\-eE+]/g, ""))
             }
        });
        console.log(Number(this.mainData[0].Total_Cases_text));
       this.totalCase=Number(this.mainData[0].Total_Cases_text);
       this.totalDeaths=Number(this.mainData[0].Total_Deaths_text);
       this.totalRecovered=Number(this.mainData[0].Total_Recovered_text);
       let country=[];
       let value:number[]=[];
       let Deaths:number[]=[];
       let recovered:number[]=[];
        for(let i=1;i<this.mainData.length;i++)
        {
               country.push(this.mainData[i].Country_text);
               value.push(Number(this.mainData[i].Total_Cases_text));
               Deaths.push(Number(this.mainData[i].Total_Deaths_text));
               recovered.push(Number(this.mainData[i].Total_Recovered_text));
        }
      console.log(value);
        this.barChartLabels=country;
        this.barChartData=[
          {data:value,label:'Total Cases'},
          {data:recovered,label:'Total recovered'},
          {data:Deaths,label:'Total Deaths'}
          ];
      });
  }

}
