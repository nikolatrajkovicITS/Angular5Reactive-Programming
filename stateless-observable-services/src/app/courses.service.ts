import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Course } from './shared/model/course';
import { Observable } from 'rxjs';
import { Lesson } from 'app/shared/model/lesson';

@Injectable()
export class CoursesService {

  courses:Course[];

  constructor(private db: AngularFireDatabase) { }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses')
        .first()                     // Called another Observable that recive the first value and then unsubscribe from the original source obsvrable
        .do(console.log);
  }

  findLatestLessons(): Observable<Lesson[]> {
    return this.db.list('lessons', {
      query: {
        orderByKey: true,
        limitToLast: 10
      }
    })
    .first()
    .do(console.log);
  }

  findCourseByUrl(courseUrl:string): Observable<Course> {
    return this.db.list('courses', {
      query: {
          orderByChild: 'url',
          equalTo: courseUrl
      }
    })
    .first()
    .map( data => data[0]);
  }

  findLessonsForCourse(courseId:string): Observable<Lesson[]> {
    return this.db.list('lessons', {
      query: {
          orderByChild: 'courseId',
          equalTo: courseId
      }
    })
    .first();
  }
}
