import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutosuggestionComponent } from './autosuggestion.component';

describe('AutosuggestionComponent', () => {
  let component: AutosuggestionComponent;
  let fixture: ComponentFixture<AutosuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutosuggestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutosuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
