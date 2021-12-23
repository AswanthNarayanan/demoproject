import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  customer = [
    {name:'Pragati',
     details:'27 Yrs, 5ft 5in,MBBS,Doctor,Poosam',
     otherdetails:'Hindu - kayastha,Chennai',
     img:'assets/pic1.jpg',
     power:0 
   },
  ];

  constructor() { }

  ngOnInit() {}

}
