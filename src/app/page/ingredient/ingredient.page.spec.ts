import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { IngredientPage } from './ingredient.page';

describe('Tab2Page', () => {
  let component: IngredientPage;
  let fixture: ComponentFixture<IngredientPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
