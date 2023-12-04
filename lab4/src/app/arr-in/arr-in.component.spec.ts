import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrInComponent } from './arr-in.component';

describe('ArrInComponent', () => {
  let component: ArrInComponent;
  let fixture: ComponentFixture<ArrInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
