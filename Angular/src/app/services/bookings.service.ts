import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bookings } from '../models/bookings.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  apiUrl = 'http://localhost:8080'
  
  httpOptions = {
    headers :new HttpHeaders({
      'Content-Type':'application/json'
    })    
  }

  constructor(private _http: HttpClient) { }

  getAllBookings(){
    return this._http.get<Bookings[]>(this.apiUrl+'/bookings/allBookings')
  }

  getBookings(email: string | null){
    return this._http.get<Bookings[]>(this.apiUrl+'/bookings/getByUser/'+email);
  }

  addBooking(id: any,bookings: { email: any; locationid: any; vehicle_type?: string; duration?: number; time?: string; slotid?: string; date?: string; vehicle_no?: string; }):Observable<Bookings>{
    bookings.locationid = id;
    bookings.email = sessionStorage.getItem('email');
    console.log(bookings);
    return this._http.post<Bookings>(this.apiUrl+'/bookings/add', JSON.stringify(bookings), this.httpOptions ); 
  }

  endBooking(bookingid: string){
    return this._http.get<Boolean>(this.apiUrl+'/bookings/endBooking/'+bookingid);
  }

}
