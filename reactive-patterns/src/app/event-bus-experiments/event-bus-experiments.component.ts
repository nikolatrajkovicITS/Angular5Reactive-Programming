import { Component, OnInit } from '@angular/core';
import { globalEventBus, LESSONS_LIST_AVAILABLE } from './event-bus';
import { testLessons } from 'app/shared/model/test-lessons';

@Component({
  selector: 'app-event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {
  lessons: string[] = [];

  constructor() { }

  ngOnInit() {
    console.log('Top level component broadcasted all lessons ...');

    /**
     * Whenever this comp is intitialize - we are going to call 
     * the globalEventBus and emit a list of lessonss to 
     * any observers that wolud need to recive this data
     */
    globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE, 
                                   testLessons.slice(0));      // Created copy of this array
  }

  addLesson(input) {
    this.lessons.push(input);
  }

}
