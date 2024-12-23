import { Component, Input } from '@angular/core';
import { Line } from 'd3';
import { LineChartData } from '../data-visualizations.interfaces';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent {
  @Input() data: LineChartData[] | undefined;
}
