import { Component, OnInit } from '@angular/core';
import { recobrosServices } from 'src/app/service/recobro.service';

const colors: any = {
  red: {
    primary: '#FF6384',
  },
  blue: {
    primary: '#36A2EB',
  },
  yellow: {
    primary: '#e3bc08',
  },
  green: {
    primary: '#1FF00A',
  }
};

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  constructor(private recobrosService: recobrosServices) { }

  public pieChartDataA = [];
  public pieChartLabelsA = [];
  public pieChartColorsA = [];
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartColors = [ { backgroundColor: [colors.blue.primary, colors.green.primary, colors.yellow.primary, colors.red.primary], }, ]; 
  public pieChartType = 'pie';

  ngOnInit() {
    /*this.recobrosService.findByName('', '').subscribe(data => {
      
    });*/

  }

  iniciarGrafica(data : any){    
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.pieChartColorsA = [ { backgroundColor: [colors.blue.primary, colors.green.primary, colors.yellow.primary, colors.red.primary], }, ]; 
    this.pieChartLabelsA= [(data[0])[0], (data[1])[0], (data[2])[0], (data[3])[0]];
    this.pieChartDataA= [(data[0])[2], (data[1])[2], (data[2])[2], (data[3])[2]];
    this.pieChartData.length = 0;
    this.pieChartColors.push(...this.pieChartColorsA);
    this.pieChartData.push(...this.pieChartLabelsA);
    this.pieChartData.push(...this.pieChartDataA);

  }

  filtrarGrafica(fechaI: string, fechaF: string){
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.pieChartColors = [ { backgroundColor: [colors.blue.primary, colors.green.primary, colors.yellow.primary, colors.red.primary], }, ]; 
    this.recobrosService.findByName(fechaI, fechaF).subscribe(data => {
      this.pieChartLabels= [(data[0])[0], (data[1])[0], (data[2])[0], (data[3])[0]];
    //  this.pieChartData= [(data[0])[2], (data[1])[2], (data[2])[2], (data[3])[2]];
      this.pieChartData.push( [(data[0])[2], (data[1])[2], (data[2])[2], (data[3])[2]]);
    });
  }


}
