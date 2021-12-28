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

  ngOnInit() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}
  }

}
