import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective {

  constructor(private _templateRef: TemplateRef<any>, private _viewContainerRef: ViewContainerRef) {
  }

  @Input() set appTest(input: any){
    if(input){
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
    else{
      this._viewContainerRef.clear();
    }
  }

}
