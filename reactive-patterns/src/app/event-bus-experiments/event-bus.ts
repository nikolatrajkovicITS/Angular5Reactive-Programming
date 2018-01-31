import * as _ from 'lodash';

export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_AVAILABLE';
export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

export interface Observer {
    notify(data:any);
}

interface Subject {
    registerObserver(eventType:string, obs:Observer);
    unregisterObserver(eventType:string, obs:Observer);
    notifyObservers(eventType:string, data:any);
}

class EventBus implements Subject {
    private observers: {[key:string]: Observer[]} = {};

    registerObserver(eventType:string, obs: Observer) {
        this.observersPerEventType(eventType).push(obs);
    }

    unregisterObserver(eventType:string, obs: Observer) {
        _.remove(this.observersPerEventType(eventType), el => el === obs);
    }
   
    notifyObservers(eventType:string, data: any) {
        this.observersPerEventType(eventType)                   // loop throught the list of all Observers(observers: {[key:string]: Observer[]}) and return eventtype
            .forEach(obs => obs.notify(data));                  // and for each of this observers we are going to call notify and pass in data that we recived as argument of method  
    }

    private observersPerEventType(eventType:string): Observer[] {
        const observersPerType = this.observers[eventType];
        if (!observersPerType) {
            this.observers[eventType] = [];
        }
        return this.observers[eventType];
    }
}

export const globalEventBus = new EventBus();