import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumbers]'
})
export class AlphanumbersDirective {

  // Allow decimal numbers and negative values
private regex: RegExp = new RegExp(/^[0-9]*$/g);
// Allow key codes for special events. Reflect :
// Backspace, tab, end, home
private specialKeys: Array<string> = [
  "Backspace",
  "Tab",
  "End",
  "Home",
  "-",
  "ArrowRight",
  "ArrowLeft",
];
constructor(private el: ElementRef) {}
@HostListener("keydown", ["$event"])
onKeyDown(event: KeyboardEvent) {
  "ctrlKey";
  // Allow Backspace, tab, end, and home keys
  if (event.ctrlKey === true) {
    const controlKeys = ["a", "c", "v", "z"];
    if (controlKeys.indexOf(event.key) !== -1) {
      return;
    }
  }
  if (this.specialKeys.indexOf(event.key) !== -1) {
    return;
  }
  let current: string = this.el.nativeElement.value;
  let next: string = current.concat(event.key);
  const key = event.keyCode;
  let isPrevent = false;
  if (next && !String(event.key).match(this.regex)) {
    isPrevent = true; // this is not a number
  }
  if (isPrevent == true) {
    isPrevent = false;
    if ((key >= 15 && key <= 64) || (key >= 123) || (key >= 96 && key <= 105)) {
      isPrevent = true;   // this is not a albha
    }
  }
  if (isPrevent == true) {
    event.preventDefault();
  }
}

}
