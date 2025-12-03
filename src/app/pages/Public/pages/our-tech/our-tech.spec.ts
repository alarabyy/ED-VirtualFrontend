import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurTech } from './our-tech';

describe('OurTech', () => {
  let component: OurTech;
  let fixture: ComponentFixture<OurTech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurTech]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurTech);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
