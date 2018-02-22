import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceTypeComponent } from './place-type.component';

describe('PlaceTypeComponent', () => {
  let component: PlaceTypeComponent;
  let fixture: ComponentFixture<PlaceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
