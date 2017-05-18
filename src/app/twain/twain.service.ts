import { Injectable } from '@angular/core';

@Injectable()
export class TwainService {
    realQuote = `Two roads diverged in the woods, and I took the least travelled path...... 
    Now if that isn't a metaphor for major league butt stuff, I don't know what is. -Peter Griffin`;
    getQuote() { return Promise.resolve(this.realQuote); }
}
