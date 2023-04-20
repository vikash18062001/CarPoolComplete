import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'autosuggestion',
  templateUrl: './autosuggestion.component.html',
  styleUrls: ['./autosuggestion.component.scss']
})
export class AutosuggestionComponent implements OnInit {

  @Input() pControlName !: string;
  @Input() pFormGroup !: FormGroup;
  locations : Array<any> = [];

  constructor(private locService : LocationService) { }

  ngOnInit(): void {
    this.locService.getLocation().subscribe((response : any) =>{
      this.locations = response.data;
      this.locations.forEach(obj=>obj.name = obj.name.charAt(0).toUpperCase() + obj.name.substr(1).toLowerCase());
    })
  }

  selectEvent(item:any) {
    this.pFormGroup.controls.stops == undefined ? this.pFormGroup.get(this.pControlName)?.setValue(item.name) : this.pFormGroup.controls.stops.get(this.pControlName)?.setValue(item.name);
  }

  onChangeSearch(search: string) {
    this.pFormGroup.controls.stops == undefined ? this.pFormGroup.get(this.pControlName)?.setValue(search) : this.pFormGroup.controls.stops.get(this.pControlName)?.setValue(search);
  }

  onFocused(e:any) {
  }

  onInputCleared() {
    this.pFormGroup.get(this.pControlName)?.setValue("");
  }

  


}
