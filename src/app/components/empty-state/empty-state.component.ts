import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-empty-state',
    template: `
    <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
    <div style="text-align: center; color: darkslategrey;">
        <img [ngStyle]="{'height': height+'px', 'width': width+'px'}" src="assets/empty-state/empty-box.png" /><br/>
        <b>{{ title }}</b><br />
        <small *ngIf="subTitle">{{ subTitle }}</small>
    </div>
   </div>`
})
export class EmptyStateComponent implements OnInit {
    @Input()
    title: string = '';

    @Input()
    subTitle: string = '';

    @Input()
    width: number = 120;

    @Input()
    height: number = 115;

    constructor() { }

    ngOnInit(): void {

    }
}