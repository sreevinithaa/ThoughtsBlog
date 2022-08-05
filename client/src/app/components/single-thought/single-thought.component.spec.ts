import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleThoughtComponent } from './single-thought.component';

describe('SingleThoughtComponent', () => {
  let component: SingleThoughtComponent;
  let fixture: ComponentFixture<SingleThoughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleThoughtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleThoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
