import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalheAlertasPage } from './meus-veiculos-detalhe-alertas.page';

describe('MeusVeiculosDetalheAlertasPage', () => {
  let component: MeusVeiculosDetalheAlertasPage;
  let fixture: ComponentFixture<MeusVeiculosDetalheAlertasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosDetalheAlertasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosDetalheAlertasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
