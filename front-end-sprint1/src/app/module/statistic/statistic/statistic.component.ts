import {Component, OnInit} from '@angular/core';
import {StatisticService} from '../../../service/statistic/statistic.service';
import {StatisticByComputer} from '../../../model/statistic/statistic-by-computer';
import {StatisticByMonth} from '../../../model/statistic/statistic-by-month';
import {StatisticByAccount} from '../../../model/statistic/statistic-by-account';
import {FormControl, FormGroup} from '@angular/forms';
import {InputStatistic} from '../../../model/statistic/input-statistic';
import {DatePipe} from '@angular/common';
import {Chart, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


Chart.register(...registerables);

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
// Create by HauHP
export class StatisticComponent implements OnInit {
  listStatisticByComputer: StatisticByComputer[];
  listStatisticByMonth: StatisticByMonth[];
  listStatisticByAccount: StatisticByAccount[];
  statisticInput: InputStatistic;
  pastDay = this.datePipe.transform(new Date().setDate(new Date().getDate() - 30), 'yyyy-MM-dd');
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  statisticForm = new FormGroup({
    startDate: new FormControl(this.pastDay),
    endDate: new FormControl(this.today),
    sort: new FormControl('none'),
    type: new FormControl('computer')
  });
  private myChart: Chart;

  constructor(private statisticService: StatisticService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.statisticService.getStatisticByComputer
    (this.datePipe.transform(new Date().setDate(new Date().getDate() - 3650), 'yyyy-MM-dd'), this.today)
      .subscribe(value => this.listStatisticByComputer = value,
        error => console.log(error),
        () => this.createChartComputer());
  }

  onSubmit() {
    this.statisticInput = this.statisticForm.value;
    if (this.statisticInput.type === 'computer') {
      this.statisticService.getStatisticByComputer(this.statisticInput.startDate, this.statisticInput.endDate)
        .subscribe(value => this.listStatisticByComputer = value,
          error => console.log(error),
          () => {
            if (this.statisticInput.sort === 'ascending') {
              this.listStatisticByComputer.sort((a, b) => (a.hour > b.hour) ? 1 : -1);
            }
            if (this.statisticInput.sort === 'decrease') {
              this.listStatisticByComputer.sort((a, b) => (a.hour < b.hour) ? 1 : -1);
            }
            this.myChart.destroy();
            this.createChartComputer();
          });
    }
    if (this.statisticInput.type === 'month') {
      this.statisticService.getStatisticByMonth(this.statisticInput.startDate, this.statisticInput.endDate)
        .subscribe(value => this.listStatisticByMonth = value,
          error => console.log(error),
          () => {
            if (this.statisticInput.sort === 'ascending') {
              this.listStatisticByMonth.sort((a, b) => (a.total > b.total) ? 1 : -1);
            }
            if (this.statisticInput.sort === 'decrease') {
              this.listStatisticByMonth.sort((a, b) => (a.total < b.total) ? 1 : -1);
            }
            this.myChart.destroy();
            this.createChartMonth();
          });
    }
    if (this.statisticInput.type === 'account') {
      this.statisticService.getStatisticByAccount(this.statisticInput.startDate, this.statisticInput.endDate)
        .subscribe(value => this.listStatisticByAccount = value,
          error => console.log(error),
          () => {
            if (this.statisticInput.sort === 'ascending') {
              this.listStatisticByAccount.sort((a, b) => (a.hour > b.hour) ? 1 : -1);
            }
            if (this.statisticInput.sort === 'decrease') {
              this.listStatisticByAccount.sort((a, b) => (a.hour < b.hour) ? 1 : -1);
            }
            this.myChart.destroy();
            this.createChartAccount();
          });
    }
  }


  onChange(value: any) {
    switch (value) {
      case '1 week':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 7), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '3 week':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 21), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '1 month':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 30), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '2 month':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 60), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '1 quarter':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 120), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '2 quarter':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 240), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '1 year':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 365), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      default:
        console.log('default');
    }
  }

  createChartComputer() {
    // @ts-ignore
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'hour',
          data: this.listStatisticByComputer,
          parsing: {
            xAxisKey: 'computer',
            yAxisKey: 'hour'
          },
          backgroundColor: [
            '#FFF448'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Hour',
              color: '#3EB595',
              font: {
                family: 'Averta',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 30, bottom: 0}
            }
          },
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Computer ID',
              color: '#3EB595',
              font: {
                family: 'Averta',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Statistic by computer chart',
            position: 'top',
            color: '#3EB595',
            font: {
              family: 'Averta',
              size: 30,
              style: 'normal',
              lineHeight: 1.0
            }
          }
        }
      }
    });
  }

  createChartMonth() {
    // @ts-ignore
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'money service',
          data: this.listStatisticByMonth,
          parsing: {
            xAxisKey: 'month',
            yAxisKey: 'service'
          },
          backgroundColor: [
            '#FFF447'
          ],
          borderWidth: 1
        },
          {
            label: 'money computer',
            data: this.listStatisticByMonth,
            parsing: {
              xAxisKey: 'month',
              yAxisKey: 'computer'
            },
            backgroundColor: [
              '#3EB595'
            ],
            borderWidth: 1
          },
          {
            label: 'money total',
            data: this.listStatisticByMonth,
            parsing: {
              xAxisKey: 'month',
              yAxisKey: 'total'
            },
            backgroundColor: [
              '#696969'
            ],
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Money (VND)',
              color: '#3EB595',
              font: {
                family: 'Averta',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 30, bottom: 0}
            }
          },
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Month',
              color: '#3EB595',
              font: {
                family: 'Averta',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Statistic by month chart',
            position: 'top',
            color: '#3EB595',
            font: {
              family: 'Averta',
              size: 30,
              style: 'normal',
              lineHeight: 1.0
            }
          }
        }
      }
    });
  }

  createChartAccount() {
    // @ts-ignore
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'hour',
          data: this.listStatisticByAccount,
          parsing: {
            xAxisKey: 'account',
            yAxisKey: 'hour'
          },
          backgroundColor: [
            '#FFF447'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Hour',
              color: '#3EB595',
              font: {
                family: 'Averta',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 30, bottom: 0}
            }
          },
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Account',
              color: '#3EB595',
              font: {
                family: 'Averta',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Statistic by account chart',
            position: 'top',
            color: '#3EB595',
            font: {
              family: 'Averta',
              size: 30,
              style: 'normal',
              lineHeight: 1.0
            }
          }
        }
      }
    });
  }

}
