import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePartsComponent } from './issue-parts';

describe('IssuePartsComponent', () => {
    let component: IssuePartsComponent;
    let fixture: ComponentFixture<IssuePartsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IssuePartsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IssuePartsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

   /* it('should create', () => {
        expect(component).toBeTruthy();
    });*/
});