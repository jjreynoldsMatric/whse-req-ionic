import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFormControlComponent } from './item-form-control';

describe('ItemFormControlComponent', () => {
    let component: ItemFormControlComponent;
    let fixture: ComponentFixture<ItemFormControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFormControlComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemFormControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /*it('should create', () => {
        expect(component).toBeTruthy();
    });*/
});