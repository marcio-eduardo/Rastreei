import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalhesRotaTextoPage } from './meus-veiculos-detalhes-rota-texto.page';

describe('MeusVeiculosDetalhesRotaTextoPage', () => {
  let component: MeusVeiculosDetalhesRotaTextoPage;
  let fixture: ComponentFixture<MeusVeiculosDetalhesRotaTextoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosDetalhesRotaTextoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosDetalhesRotaTextoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
