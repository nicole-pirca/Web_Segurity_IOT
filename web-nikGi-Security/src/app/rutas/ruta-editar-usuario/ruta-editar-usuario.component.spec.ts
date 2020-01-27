import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaEditarUsuarioComponent } from './ruta-editar-usuario.component';

describe('RutaEditarUsuarioComponent', () => {
  let component: RutaEditarUsuarioComponent;
  let fixture: ComponentFixture<RutaEditarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaEditarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
