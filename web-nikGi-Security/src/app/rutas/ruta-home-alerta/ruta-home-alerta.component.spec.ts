import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaHomeAlertaComponent } from './ruta-home-alerta.component';

describe('RutaHomeAlertaComponent', () => {
  let component: RutaHomeAlertaComponent;
  let fixture: ComponentFixture<RutaHomeAlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaHomeAlertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaHomeAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
