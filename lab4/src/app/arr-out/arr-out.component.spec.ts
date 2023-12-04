import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrOutComponent } from './arr-out.component';

describe('ArrOutComponent', () => {
  let component: ArrOutComponent;
  let fixture: ComponentFixture<ArrOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
