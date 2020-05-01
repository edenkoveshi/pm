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
  selectedDomain: string;
  selectedDomain_old: string;
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  //@Output() onSelectedOption = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.myControl = new FormControl();

    this.dataService.chosenDomain.subscribe(domain => {
      this.selectedDomain_old = this.selectedDomain;
      this.selectedDomain = domain;
    });

    this.dataService.displayServers.subscribe(servers => {
      if (this.selectedDomain == this.selectedDomain_old) return;
      this.selectedDomain_old = this.selectedDomain;
      this.data = this.dataService.getApps();
      this.data = this.data.concat(servers.map(s => s.Name));
    });

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })

    this.selectedDomain = '';
    this.selectedDomain_old = '';
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

  filterServerList(event): void {
    let result = "";
    if (event.source) { //selection event
      result = event.source.value;
    }
    else { //keyup event
      result = event.target.value;
    }
    //if (result) {
      //this.dataService.searchOption = result;
      //this.onSelectedOption.emit(this.dataService.searchOption
    this.dataService.filterAndSetDisplayServers(s => (this.isSubstring(s.Name, result) || this.isSubstring(s.App,result)) && s.Domain == this.dataService.getChosenDomain())
     
    //}
    //this.focusOnPlaceInput();
  }

  private isSubstring(s1: string, s2: string): boolean { //is s2 substring of s1
    return s1.toLowerCase().substring(0, s2.length).indexOf(s2.toLowerCase()) != -1
  }

  focusOnPlaceInput(): void {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

  /*removeOption(option) : void {

    let index = this.dataService.searchOption.indexOf(option);
    if (index >= 0)
      this.dataService.searchOption.splice(index, 1);
    this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.dataService.searchOption)
  }*/


}
