import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaRegistroComponent } from './ruta-registro.component';

describe('RutaRegistroComponent', () => {
  let component: RutaRegistroComponent;
  let fixture: ComponentFixture<RutaRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
