import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackdisplayComponent } from './snackdisplay.component';

describe('SnackdisplayComponent', () => {
  let component: SnackdisplayComponent;
  let fixture: ComponentFixture<SnackdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackdisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
