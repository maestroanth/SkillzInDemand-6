import { async, tick, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TwainComponent } from './twain.component';
import { TwainService } from './twain.service';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let twainService;
  let spy;
  let testQuote = "Mark Twain's name is actually Samuel Clemmings. -Brain Griffin";

  beforeEach(() => {
      TestBed.configureTestingModule({
          declarations: [TwainComponent],
          providers: [TwainService],
      });

      fixture = TestBed.createComponent(TwainComponent);
      component = fixture.componentInstance;

      // TwainService actually injected into the component
      twainService = fixture.debugElement.injector.get(TwainService);

      // Setup spy on the `getQuote` method ***Setting up a 'spy' is what is different then welcome component for async services***
      spy = spyOn(twainService, 'getQuote')//You can fake it or set up a 'spy' as options, but spying is harder, or combine both
          .and.returnValue(Promise.resolve(testQuote));

      // Get the Twain quote element by CSS selector (e.g., by class name)
      de = fixture.debugElement.query(By.css('.twain'));
      el = de.nativeElement;
  });


  //tests
  it('should not show quote before OnInit', () => {
      expect(el.textContent).toBe('', 'nothing displayed');
      expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
  });
  it('should still not show quote after component initialized', () => {
      fixture.detectChanges();
      // getQuote service is async => still has not returned with quote
      expect(el.textContent).toBe('...I haven\'t initialized yet moron!', 'no quote yet');
      expect(spy.calls.any()).toBe(true, 'getQuote called');
  });
  it('should show original initialized quote', () => {
      this.testQuote = twainService.realQuote;
      fixture.detectChanges();
      // getQuote service is async => still has not returned with quote
      expect(el.textContent).toBe('...I haven\'t initialized yet moron!', 'no quote yet');
      expect(spy.calls.any()).toBe(true, 'getQuote called');
  });
  it('should show quote after getQuote promise (async)', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => { // wait for async getQuote
          fixture.detectChanges();        // update view with quote
          expect(el.textContent).toBe(testQuote);
      });
  }));
  it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
      fixture.detectChanges();
      tick();                  // wait for async getQuote, only works inside fakeAsync function
      fixture.detectChanges(); // update view with quote
      expect(el.textContent).toBe(testQuote);
      //cannot make an XHR (XMLHTTPRequest) call within a fakeAsync
  }));

  
  it('should show quote after getQuote promise (done)', (done: any) => {
      fixture.detectChanges();

      // get the spy promise and wait for it to resolve
      spy.calls.mostRecent().returnValue.then(() => {
          fixture.detectChanges(); // update view with quote
          expect(el.textContent).toBe(testQuote);
          done();
      });
      //cannot call asyc or fakeAsync when using intervalTimer and other async Observable methods which is why done can still be useful
  });

});
