import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalheRotaPage } from './meus-veiculos-detalhe-rota.page';

describe('MeusVeiculosDetalheRotaPage', () => {
  let component: MeusVeiculosDetalheRotaPage;
  let fixture: ComponentFixture<MeusVeiculosDetalheRotaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosDetalheRotaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosDetalheRotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
