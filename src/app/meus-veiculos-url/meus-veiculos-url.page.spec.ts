import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusVeiculosUrlPage } from './meus-veiculos-url.page';

describe('MeusVeiculosUrlPage', () => {
  let component: MeusVeiculosUrlPage;
  let fixture: ComponentFixture<MeusVeiculosUrlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVeiculosUrlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusVeiculosUrlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
