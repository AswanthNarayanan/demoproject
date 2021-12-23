import { Component,AfterViewInit, ViewChildren, ElementRef, QueryList, NgZone } from '@angular/core';
import { GestureController, IonCard, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
   customer = [
     {name:'Pragati',
      details:'27 Yrs, 5ft 5in,MBBS,Doctor,Poosam',
      otherdetails:'Hindu - kayastha,Chennai',
      img:'assets/pic1.jpg',
      power:0 
    },
      
      {name:'Priyanka',
      details:'27 Yrs, 5ft 2in,MBBS,Doctor,Poosam',
      otherdetails:'Hindu - kayastha,Chennai',
      img:'assets/pic2.jpg',
      power:0
    }
   ];
   @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>;
   longPressActive = false;
  constructor(private gestureCtrl: GestureController,private zone: NgZone, private plt: Platform) {}

  ngAfterViewInit() {
      const cardArray = this.cards.toArray();

      // this.useLongPress(cardArray);
      this.useSwipe(cardArray);
  }

  useLongPress(cardArray){
   for (let i = 0; i < cardArray.length; i++){
     const card = cardArray[i];
     console.log('card: ', card);

     const gesture = this.gestureCtrl.create({
      el: card.nativeElement,
      threshold: 15,
      gestureName: 'long-press',
      onStart: ev =>{
         this.longPressActive = true;
         this.increasePower(i);
      },
      onEnd: ev =>{
        this.longPressActive =false;
      }
     });
     gesture.enable(true);
   }
  }
  increasePower(i){
    console.log('increse')
    setTimeout(()=>{
      if(this.longPressActive){
        this.zone.run(()=>{
          this.customer[i].power++;
          this.increasePower(i); 
        });
      }
    },200)
  }

  useSwipe(cardArray){
    for (let i = 0; i < cardArray.length; i++){
      const card = cardArray[i];
      console.log('card: ', card);
 
      const gesture = this.gestureCtrl.create({
       el: card.nativeElement,
       threshold: 15,
       gestureName: 'long-press',
       onStart: ev =>{
         
       },
       onMove: ev =>{
        card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX/10}deg)`;
        this.setCardColor(ev.deltaX, card.nativeElement);
       },
       onEnd: ev =>{
        card.nativeElement.style.transition = '3.5s ease-out';

        if(ev.deltaX > 150){
          card.nativeElement.style.transition = `translateX(${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`
        } else if(ev.deltaX < -150){
          card.nativeElement.style.transition = `translateX(-${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`
        }else{
          card.nativeElement.style.transition = '';
        }
       }
      });
      gesture.enable(true);
    }
  }
  setCardColor(x, element){
    let color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);

    if(x < 0 ){
      color = '#FF' + hexCode + hexCode;
    }else{
      color = '#' + hexCode + 'FF' + hexCode;
    }
    element.style.background = color;
  }

  decimalToHex(d, padding){
    let hex = Number(d).toString(16);
    padding = typeof padding === 'undefined' || padding === null ? (padding = 2) : padding;

    while(hex.length < padding){
      hex = '0' + hex;
    }

    return hex;
  }
}
