import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigasAdminComponent } from './ligas-admin.component';

describe('LigasAdminComponent', () => {
  let component: LigasAdminComponent;
  let fixture: ComponentFixture<LigasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigasAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
