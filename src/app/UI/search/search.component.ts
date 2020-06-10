import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchword: string;
  constructor() { }

  ngOnInit(): void {
  }

  searchThis() {
    
  }

  resetSearch() {
    this.searchword = ''
  }

}
