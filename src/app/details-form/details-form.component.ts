import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Person } from '../data-model/person.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification/notification.component';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {

  constructor( private readonly dataService:DataService, private _snackBar: MatSnackBar) { }

  person: Person = new Person();
  ages: number[] = [];
  response: string;

  ngOnInit() {
    // populating age array with 1 to 100
    this.ages = Array(100).fill(1).map((e,i)=>i+1);
  }

  onDetailsFormSubmit(){

    this.dataService
  .postUserDetails(this.person)
  .subscribe(person => {
    console.log('postUserDetails has been successful:', person)
      let message = person.firstName + ' ' + person.lastName + ' details has been saved successfully';
      this._snackBar.openFromComponent(NotificationComponent, {
        data: {
          message: message,
          success: true
        },
        duration: 3000,
      });
    });
    error => {
      console.log ('postUserDetails post failed: ', error)
      let message = 'Save details has failed';
      this._snackBar.openFromComponent(NotificationComponent, {
        data: {
          message: message,
          success: false
        },
        duration: 3000,
      });
    }
  };

  getGamingDetails(){
    this.dataService
    .getGamingTrends()
    .subscribe(JSON => {
      this.response = JSON;
      console.log('postUserDetails has been successful:', JSON);

        // let message = person.firstName + ' ' + person.lastName + ' details has been saved successfully';
        // this._snackBar.openFromComponent(NotificationComponent, {
        //   data: {
        //     message: message,
        //     success: true
        //   },
        //   duration: 3000,
        // });
      });
      error => {
        console.log ('postUserDetails post failed: ', error)
        // let message = 'Save details has failed';
        // this._snackBar.openFromComponent(NotificationComponent, {
        //   data: {
        //     message: message,
        //     success: false
        //   },
        //   duration: 3000,
        // });
      }
  }

}
