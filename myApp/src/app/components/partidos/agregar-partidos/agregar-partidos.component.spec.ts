import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPartidosComponent } from './agregar-partidos.component';

describe('AgregarPartidosComponent', () => {
  let component: AgregarPartidosComponent;
  let fixture: ComponentFixture<AgregarPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPartidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
