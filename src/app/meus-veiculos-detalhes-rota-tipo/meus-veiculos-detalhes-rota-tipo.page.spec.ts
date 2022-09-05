import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalhesRotaTipoPage } from './meus-veiculos-detalhes-rota-tipo.page';

describe('MeusVeiculosDetalhesRotaTipoPage', () => {
  let component: MeusVeiculosDetalhesRotaTipoPage;
  let fixture: ComponentFixture<MeusVeiculosDetalhesRotaTipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosDetalhesRotaTipoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosDetalhesRotaTipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
