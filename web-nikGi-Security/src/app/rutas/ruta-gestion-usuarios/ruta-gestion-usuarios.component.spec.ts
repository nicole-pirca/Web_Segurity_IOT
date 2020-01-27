import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaGestionUsuariosComponent } from './ruta-gestion-usuarios.component';

describe('RutaGestionUsuariosComponent', () => {
  let component: RutaGestionUsuariosComponent;
  let fixture: ComponentFixture<RutaGestionUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaGestionUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaGestionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
