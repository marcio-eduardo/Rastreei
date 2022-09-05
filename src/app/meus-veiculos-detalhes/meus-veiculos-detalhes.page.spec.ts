import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalhesPage } from './meus-veiculos-detalhes.page';

describe('MeusVeiculosDetalhesPage', () => {
  let component: MeusVeiculosDetalhesPage;
  let fixture: ComponentFixture<MeusVeiculosDetalhesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosDetalhesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
