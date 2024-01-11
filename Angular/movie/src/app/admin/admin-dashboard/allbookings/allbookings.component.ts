import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Bookings } from '../../../models/bookings.model';
import { BookingsService } from '../../../services/bookings.service';

@Component({
  selector: 'app-allbookings',
  templateUrl: './allbookings.component.html',
  styleUrls: ['./allbookings.component.css']
})
export class AllbookingsComponent implements OnInit {

  AllBookings$: Bookings[] = [];

  constructor(private bookingsService : BookingsService) { }

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings(){
    return this.bookingsService.getAllBookings()
    .subscribe(data => this.AllBookings$ = data)
  }

}
