import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {
  lessons: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  addLesson(input) {
    this.lessons.push(input);
  }

}
