import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContentAlertDrawer } from './content-alert-drawer';

describe('ContentAlertDrawer', () => {
  let component: ContentAlertDrawer;
  let fixture: ComponentFixture<ContentAlertDrawer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAlertDrawer ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentAlertDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
