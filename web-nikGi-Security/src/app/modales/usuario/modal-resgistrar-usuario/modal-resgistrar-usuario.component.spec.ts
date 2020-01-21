import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResgistrarUsuarioComponent } from './modal-resgistrar-usuario.component';

describe('ModalResgistrarUsuarioComponent', () => {
  let component: ModalResgistrarUsuarioComponent;
  let fixture: ComponentFixture<ModalResgistrarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResgistrarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResgistrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
