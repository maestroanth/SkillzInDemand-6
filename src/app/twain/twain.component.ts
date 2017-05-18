import { Component, OnInit } from '@angular/core';
import { TwainService } from './twain.service';

@Component({
  selector: 'twain-quote',
  template: '<p class="twain"><i>{{quote}}</i></p>'
})
export class TwainComponent  implements OnInit {
  intervalId: number;
  quote = '...I haven\'t initialized yet moron!';
  constructor(private twainService: TwainService) { }

  ngOnInit(): void {
      this.twainService.getQuote().then(quote => this.quote = quote);
      //will return a Promise
  }
}
