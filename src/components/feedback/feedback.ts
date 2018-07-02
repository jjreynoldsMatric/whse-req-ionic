import { Component } from '@angular/core';

/**
 * Generated class for the FeedbackComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackComponent {

  text: string;

  constructor() {
    console.log('Hello FeedbackComponent Component');
    this.text = 'Hello World';
  }

}
