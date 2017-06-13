import { Component, ViewChild, HostListener, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'back-to-top',
    styleUrls: ['./backToTop.scss'],
    template: `
        <i #backToTop class="fa fa-angle-up back-top back-to-top" title="Back to Top"></i>
    `
})
export class BackToTop {

    @Input() position: number = 400;
    @Input() showSpeed: number = 500;
    @Input() moveSpeed: number = 1000;

    @ViewChild('backToTop') _selector: ElementRef;

    ngAfterViewInit() {
        this._onWindowScroll();
    }

    @HostListener('click')
    _onClick(): boolean {
        jQuery('html, body').animate({scrollTop: 0}, {duration: this.moveSpeed});
        return false;
    }

    @HostListener('window:scroll')
    _onWindowScroll(): void {
        let el = this._selector.nativeElement;
        window.scrollY > this.position ? jQuery(el).fadeIn(this.showSpeed) : jQuery(el).fadeOut(this.showSpeed);
    }
}
