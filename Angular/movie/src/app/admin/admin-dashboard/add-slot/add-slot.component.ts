import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Locations } from '../../../models/locations.model';
import { LocationsService } from '../../../services/locations.service';
import { Slots } from '../../../models/slots.model';
import { SlotsService } from '../../../services/slots.service';


@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {
  
  slots$: Slots[] = [];
  locations$: Locations[] = [];
  form = new FormGroup({
    locationid : new FormControl('', Validators.required),
    slotid : new FormControl('', Validators.required),
    slotno : new FormControl('', Validators.required)
  })
  constructor(private slotService: SlotsService, private locationService : LocationsService) { }

  ngOnInit(): void {
    this.getAllSlots();
    this.loadLocations();
  }
  onSubmit(){
    this.slotService.addSlot(JSON.stringify(this.form.value))
    .subscribe((data => {
      if(data == true){
        alert("Show Added")
      }
      else{
        alert('Something went wrong')
      }
    }))
  }

  getAllSlots(){
    this.slotService.getAllSlots()
    .subscribe(data => this.slots$ = data)
  }

  loadLocations(){
    return this.locationService.getLocations()
    .subscribe(data => this.locations$ = data)
  }
}
