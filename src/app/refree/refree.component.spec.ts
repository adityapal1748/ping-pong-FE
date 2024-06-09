import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreeComponent } from './refree.component';

describe('RefreeComponent', () => {
  let component: RefreeComponent;
  let fixture: ComponentFixture<RefreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
