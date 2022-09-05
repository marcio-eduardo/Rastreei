import { Component, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Platform, DomController } from '@ionic/angular';

@Component({
	selector: 'content-alert-drawer',
	templateUrl: './content-alert-drawer.html',
	styleUrls: ['./content-alert-drawer.scss'],
})
export class ContentAlertDrawer implements AfterViewInit {
	@Input('options') public options: any;

	handleHeight: number = 50;
	offSetHeight: number = 100;
	bounceBack: boolean = true;
	thresholdTop: number = 200;
	thresholdBottom: number = 200;

	constructor(public element: ElementRef, public renderer: Renderer2, public domCtrl: DomController, public platform: Platform) {

	}

	async ngAfterViewInit() {
		if (this.options.handleHeight) {
			this.handleHeight = this.options.handleHeight;
		}
		if (this.options.offSetHeight) {
			this.offSetHeight = this.options.offSetHeight;
		}
		if (this.options.bounceBack) {
			this.bounceBack = this.options.bounceBack;
		}
		if (this.options.thresholdFromBottom) {
			this.thresholdBottom = this.options.thresholdFromBottom;
		}
		if (this.options.thresholdFromTop) {
			this.thresholdTop = this.options.thresholdFromTop;
		}
		this.renderer.setStyle(this.element.nativeElement, 'top', this.platform.height() - this.offSetHeight - this.handleHeight + 'px');
		this.renderer.setStyle(this.element.nativeElement, 'padding-top', this.handleHeight + 'px');
		let hammer = new window['Hammer'](this.element.nativeElement);
		hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });
		hammer.on('pan', (ev) => {
			this.handlePan(ev);
		});
	}

	handlePan(ev) {
		let newTop = ev.center.y;
		let bounceToBottom = false;
		let bounceToTop = false;
		if (this.bounceBack && ev.isFinal) {
			let topDiff = newTop - this.thresholdTop;
			let bottomDiff = (this.platform.height() - this.thresholdBottom) - newTop;
			topDiff >= bottomDiff ? bounceToBottom = true : bounceToTop = true;
		}
		if ((newTop < this.thresholdTop && ev.additionalEvent === "panup") || bounceToTop) {
			this.domCtrl.write(() => {
				this.renderer.setStyle(this.element.nativeElement, 'transition', 'top 0.5s');
				this.renderer.setStyle(this.element.nativeElement, 'top', '0px');
			});
		} else if (((this.platform.height() - newTop) < this.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom) {
			this.domCtrl.write(() => {
				this.renderer.setStyle(this.element.nativeElement, 'transition', 'top 0.5s');
				this.renderer.setStyle(this.element.nativeElement, 'top', this.platform.height() - this.offSetHeight - this.handleHeight + 'px');
			});
		} else {
			this.renderer.setStyle(this.element.nativeElement, 'transition', 'none');
			if (newTop > 0 && newTop < (this.platform.height() - this.offSetHeight - this.handleHeight)) {
				if (ev.additionalEvent === "panup" || ev.additionalEvent === "pandown") {
					this.domCtrl.write(() => {
						this.renderer.setStyle(this.element.nativeElement, 'top', newTop + 'px');
					});
				}
			}
		}
	}
}
