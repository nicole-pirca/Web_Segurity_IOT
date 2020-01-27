import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaHomeHistorialComponent } from './ruta-home-historial.component';

describe('RutaHomeHistorialComponent', () => {
  let component: RutaHomeHistorialComponent;
  let fixture: ComponentFixture<RutaHomeHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaHomeHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaHomeHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
