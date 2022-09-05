import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosUrlTempoPage } from './meus-veiculos-url-tempo.page';

describe('MeusVeiculosUrlTempoPage', () => {
  let component: MeusVeiculosUrlTempoPage;
  let fixture: ComponentFixture<MeusVeiculosUrlTempoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosUrlTempoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosUrlTempoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
