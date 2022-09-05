import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosComandosVelocidadePage } from './meus-veiculos-comandos-velocidade.page';

describe('MeusVeiculosComandosVelocidadePage', () => {
  let component: MeusVeiculosComandosVelocidadePage;
  let fixture: ComponentFixture<MeusVeiculosComandosVelocidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosComandosVelocidadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosComandosVelocidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
