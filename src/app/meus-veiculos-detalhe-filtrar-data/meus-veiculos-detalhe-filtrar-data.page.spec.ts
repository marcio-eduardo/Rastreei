import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalheFiltrarDataPage } from './meus-veiculos-detalhe-filtrar-data.page';

describe('MeusVeiculosDetalheFiltrarDataPage', () => {
  let component: MeusVeiculosDetalheFiltrarDataPage;
  let fixture: ComponentFixture<MeusVeiculosDetalheFiltrarDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosDetalheFiltrarDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosDetalheFiltrarDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
