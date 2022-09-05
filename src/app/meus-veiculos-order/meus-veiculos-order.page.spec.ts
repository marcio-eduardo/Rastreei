import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosOrderPage } from './meus-veiculos-order.page';

describe('MeusVeiculosOrderPage', () => {
  let component: MeusVeiculosOrderPage;
  let fixture: ComponentFixture<MeusVeiculosOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
