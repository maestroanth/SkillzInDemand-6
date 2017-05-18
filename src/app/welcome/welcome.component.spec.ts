import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { UserService } from '../user.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  // stub UserService for test purposes
  let userServiceStub = {
      user: { isLoggedIn: true, name: 'TEST User' }
  };
  let userService;

  beforeEach(() => {

      TestBed.configureTestingModule({
          declarations: [WelcomeComponent],
          providers: [{ provide: UserService, useValue: userServiceStub }]
      });

      fixture = TestBed.createComponent(WelcomeComponent);
      component = fixture.componentInstance;

      // UserService from the root injector
      userService = TestBed.get(UserService);

      //  get the "welcome" element by CSS selector (e.g., by class name)
      de = fixture.debugElement.query(By.css('.welcome'));
      el = de.nativeElement;
  });


  it('should welcome the user', () => {
      fixture.detectChanges();
      const content = el.textContent;
      expect(content).toContain('Welcome', '"Welcome ..."');
      expect(content).toContain('TEST User', 'expected name');
  });

  it('should welcome "Bubba"', () => {
      userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
      fixture.detectChanges();
      expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
      userService.user.isLoggedIn = false; // welcome message hasn't been shown yet
      fixture.detectChanges();
      const content = el.textContent;
      expect(content).not.toContain('Welcome', 'not welcomed');
      expect(content).toMatch(/You aren\'t logged in you idiot!/i, '"log in"');
  });

});
