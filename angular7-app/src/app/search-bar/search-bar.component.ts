import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DataService } from '../search-data.service'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  myControl: FormControl;
  autoCompleteList: any[]
  data: string[];
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.myControl = new FormControl();

    this.data = this.dataService.getAllServers().map(s => s.Name);
    this.data = this.data.concat(this.dataService.getApps());

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })
  }

  private autoCompleteExpenseList(input:string) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val: string) {
    var categoryList = []
    /*if (typeof val != "string") {
      return [];
    }*/
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.data.filter(s => s.toLowerCase().substring(0,val.length).indexOf(val.toLowerCase()) != -1)
      : this.data;
  }

  filterServerList(event) : void {
    let servers = event.source.value;
    if (!servers) {
      this.dataService.searchOption = []
    }
    else {

      this.dataService.searchOption.push(servers);
      //this.onSelectedOption.emit(this.dataService.searchOption)
    }
    this.focusOnPlaceInput();
  }

  focusOnPlaceInput(): void {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

  removeOption(option) : void {

    let index = this.dataService.searchOption.indexOf(option);
    if (index >= 0)
      this.dataService.searchOption.splice(index, 1);
    this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.dataService.searchOption)
  }


}
