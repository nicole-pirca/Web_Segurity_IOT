import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHomeVivoComponent } from './gestion-home-vivo.component';

describe('GestionHomeVivoComponent', () => {
  let component: GestionHomeVivoComponent;
  let fixture: ComponentFixture<GestionHomeVivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionHomeVivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionHomeVivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
