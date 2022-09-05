import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalhesRotaMapaPage } from './meus-veiculos-detalhes-rota-mapa.page';

describe('MeusVeiculosDetalhesRotaMapaPage', () => {
  let component: MeusVeiculosDetalhesRotaMapaPage;
  let fixture: ComponentFixture<MeusVeiculosDetalhesRotaMapaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosDetalhesRotaMapaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosDetalhesRotaMapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
