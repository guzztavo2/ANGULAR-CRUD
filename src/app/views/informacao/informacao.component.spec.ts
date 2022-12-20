import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacaoComponent } from './informacao.component';

describe('InformacaoComponent', () => {
  let component: InformacaoComponent;
  let fixture: ComponentFixture<InformacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
