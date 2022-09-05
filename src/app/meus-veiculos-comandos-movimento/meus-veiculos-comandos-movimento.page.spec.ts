import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosComandosMovimentoPage } from './meus-veiculos-comandos-movimento.page';

describe('MeusVeiculosComandosMovimentoPage', () => {
  let component: MeusVeiculosComandosMovimentoPage;
  let fixture: ComponentFixture<MeusVeiculosComandosMovimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosComandosMovimentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosComandosMovimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
