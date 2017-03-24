import {Component, Input, OnInit} from '@angular/core';
import {ITransUnit} from 'ngx-i18nsupport/dist';

@Component({
  selector: 'app-translate-unit',
  templateUrl: './translate-unit.component.html',
  styleUrls: ['./translate-unit.component.css']
})
export class TranslateUnitComponent implements OnInit {

  @Input() transUnit: ITransUnit;

  constructor() { }

  ngOnInit() {
  }

}
