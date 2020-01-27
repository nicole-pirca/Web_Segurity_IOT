import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaHomeVivoComponent } from './ruta-home-vivo.component';

describe('RutaHomeVivoComponent', () => {
  let component: RutaHomeVivoComponent;
  let fixture: ComponentFixture<RutaHomeVivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaHomeVivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaHomeVivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
