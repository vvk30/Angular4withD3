import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent {
  @ViewChild('chart') private chartContainer: ElementRef;
  barData = [5, 12, 10, 23, 235, 345, 123, 234, 900];
  width = "500";

  onClick() {
    if (d3.selectAll('svg')) {
      d3.selectAll('svg').remove();
    }
    //console.log(this.data);
    let barHeight = 20;
    let scaleFactor = 10;


    let scale = d3.scaleLinear()
      .domain([d3.min(this.data), d3.max(this.data)])
      .range([50, 500]);


    let graph = d3.select("body")
      .append("svg")
      .attr('width', this.width)
      .attr('height', barHeight * this.data.length);

    let bar = graph.selectAll('g')
      .data(this.data)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
      });

    bar.append("rect")
      .attr("width", function (d) {
        return scale(d);
      })
      .attr("height", barHeight - 1);

    bar.append("text")
      .attr("x", function (d) {
        return (scale(d) - 1);
      })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function (d) {
        return d;
      })


  }
  @Input() private data: Array<any>;
  // ngOnInit() {
  //   if (this.data) {
  //     this.onClick();
  //   }
  // }
  ngOnChanges() {
    if (this.data)
      this.onClick();
  }

}
