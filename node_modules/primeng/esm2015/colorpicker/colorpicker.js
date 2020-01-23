var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Output, OnDestroy, EventEmitter, forwardRef, Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const COLORPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorPicker),
    multi: true
};
let ColorPicker = class ColorPicker {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.format = 'hex';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onChange = new EventEmitter();
        this.defaultColor = 'ff0000';
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    set colorSelector(element) {
        this.colorSelectorViewChild = element;
    }
    set colorHandle(element) {
        this.colorHandleViewChild = element;
    }
    set hue(element) {
        this.hueViewChild = element;
    }
    set hueHandle(element) {
        this.hueHandleViewChild = element;
    }
    onHueMousedown(event) {
        if (this.disabled) {
            return;
        }
        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();
        this.hueDragging = true;
        this.pickHue(event);
    }
    pickHue(event) {
        let top = this.hueViewChild.nativeElement.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        this.value = this.validateHSB({
            h: Math.floor(360 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150),
            s: this.value.s,
            b: this.value.b
        });
        this.updateColorSelector();
        this.updateUI();
        this.updateModel();
        this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
    }
    onColorMousedown(event) {
        if (this.disabled) {
            return;
        }
        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();
        this.colorDragging = true;
        this.pickColor(event);
    }
    pickColor(event) {
        let rect = this.colorSelectorViewChild.nativeElement.getBoundingClientRect();
        let top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        let left = rect.left + document.body.scrollLeft;
        let saturation = Math.floor(100 * (Math.max(0, Math.min(150, (event.pageX - left)))) / 150);
        let brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150);
        this.value = this.validateHSB({
            h: this.value.h,
            s: saturation,
            b: brightness
        });
        this.updateUI();
        this.updateModel();
        this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
    }
    getValueToUpdate() {
        let val;
        switch (this.format) {
            case 'hex':
                val = '#' + this.HSBtoHEX(this.value);
                break;
            case 'rgb':
                val = this.HSBtoRGB(this.value);
                break;
            case 'hsb':
                val = this.value;
                break;
        }
        return val;
    }
    updateModel() {
        this.onModelChange(this.getValueToUpdate());
    }
    writeValue(value) {
        if (value) {
            switch (this.format) {
                case 'hex':
                    this.value = this.HEXtoHSB(value);
                    break;
                case 'rgb':
                    this.value = this.RGBtoHSB(value);
                    break;
                case 'hsb':
                    this.value = value;
                    break;
            }
        }
        else {
            this.value = this.HEXtoHSB(this.defaultColor);
        }
        this.updateColorSelector();
        this.updateUI();
    }
    updateColorSelector() {
        if (this.colorSelectorViewChild) {
            const hsb = {};
            hsb.s = 100;
            hsb.b = 100;
            hsb.h = this.value.h;
            this.colorSelectorViewChild.nativeElement.style.backgroundColor = '#' + this.HSBtoHEX(hsb);
        }
    }
    updateUI() {
        if (this.colorHandleViewChild && this.hueHandleViewChild.nativeElement) {
            this.colorHandleViewChild.nativeElement.style.left = Math.floor(150 * this.value.s / 100) + 'px';
            this.colorHandleViewChild.nativeElement.style.top = Math.floor(150 * (100 - this.value.b) / 100) + 'px';
            this.hueHandleViewChild.nativeElement.style.top = Math.floor(150 - (150 * this.value.h / 360)) + 'px';
        }
        this.inputBgColor = '#' + this.HSBtoHEX(this.value);
    }
    onInputFocus() {
        this.onModelTouched();
    }
    show() {
        this.overlayVisible = true;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                    }
                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.updateColorSelector();
                    this.updateUI();
                }
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    alignOverlay() {
        if (this.appendTo)
            DomHandler.absolutePosition(this.overlay, this.inputViewChild.nativeElement);
        else
            DomHandler.relativePosition(this.overlay, this.inputViewChild.nativeElement);
    }
    hide() {
        this.overlayVisible = false;
    }
    onInputClick() {
        this.selfClick = true;
        this.togglePanel();
    }
    togglePanel() {
        if (!this.overlayVisible)
            this.show();
        else
            this.hide();
    }
    onInputKeydown(event) {
        switch (event.which) {
            //space
            case 32:
                this.togglePanel();
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                console.log("hey?");
                this.hide();
                break;
        }
    }
    onPanelClick() {
        this.selfClick = true;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.selfClick) {
                    this.overlayVisible = false;
                    this.unbindDocumentClickListener();
                }
                this.selfClick = false;
                this.cd.markForCheck();
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentMousemoveListener() {
        if (!this.documentMousemoveListener) {
            this.documentMousemoveListener = this.renderer.listen('document', 'mousemove', (event) => {
                if (this.colorDragging) {
                    this.pickColor(event);
                }
                if (this.hueDragging) {
                    this.pickHue(event);
                }
            });
        }
    }
    unbindDocumentMousemoveListener() {
        if (this.documentMousemoveListener) {
            this.documentMousemoveListener();
            this.documentMousemoveListener = null;
        }
    }
    bindDocumentMouseupListener() {
        if (!this.documentMouseupListener) {
            this.documentMouseupListener = this.renderer.listen('document', 'mouseup', () => {
                this.colorDragging = false;
                this.hueDragging = false;
                this.unbindDocumentMousemoveListener();
                this.unbindDocumentMouseupListener();
            });
        }
    }
    unbindDocumentMouseupListener() {
        if (this.documentMouseupListener) {
            this.documentMouseupListener();
            this.documentMouseupListener = null;
        }
    }
    validateHSB(hsb) {
        return {
            h: Math.min(360, Math.max(0, hsb.h)),
            s: Math.min(100, Math.max(0, hsb.s)),
            b: Math.min(100, Math.max(0, hsb.b))
        };
    }
    validateRGB(rgb) {
        return {
            r: Math.min(255, Math.max(0, rgb.r)),
            g: Math.min(255, Math.max(0, rgb.g)),
            b: Math.min(255, Math.max(0, rgb.b))
        };
    }
    validateHEX(hex) {
        var len = 6 - hex.length;
        if (len > 0) {
            var o = [];
            for (var i = 0; i < len; i++) {
                o.push('0');
            }
            o.push(hex);
            hex = o.join('');
        }
        return hex;
    }
    HEXtoRGB(hex) {
        let hexValue = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return { r: hexValue >> 16, g: (hexValue & 0x00FF00) >> 8, b: (hexValue & 0x0000FF) };
    }
    HEXtoHSB(hex) {
        return this.RGBtoHSB(this.HEXtoRGB(hex));
    }
    RGBtoHSB(rgb) {
        var hsb = {
            h: 0,
            s: 0,
            b: 0
        };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        if (max != 0) {
        }
        hsb.s = max != 0 ? 255 * delta / max : 0;
        if (hsb.s != 0) {
            if (rgb.r == max) {
                hsb.h = (rgb.g - rgb.b) / delta;
            }
            else if (rgb.g == max) {
                hsb.h = 2 + (rgb.b - rgb.r) / delta;
            }
            else {
                hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
        }
        else {
            hsb.h = -1;
        }
        hsb.h *= 60;
        if (hsb.h < 0) {
            hsb.h += 360;
        }
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
    }
    HSBtoRGB(hsb) {
        var rgb = {
            r: null, g: null, b: null
        };
        let h = hsb.h;
        let s = hsb.s * 255 / 100;
        let v = hsb.b * 255 / 100;
        if (s == 0) {
            rgb = {
                r: v,
                g: v,
                b: v
            };
        }
        else {
            let t1 = v;
            let t2 = (255 - s) * v / 255;
            let t3 = (t1 - t2) * (h % 60) / 60;
            if (h == 360)
                h = 0;
            if (h < 60) {
                rgb.r = t1;
                rgb.b = t2;
                rgb.g = t2 + t3;
            }
            else if (h < 120) {
                rgb.g = t1;
                rgb.b = t2;
                rgb.r = t1 - t3;
            }
            else if (h < 180) {
                rgb.g = t1;
                rgb.r = t2;
                rgb.b = t2 + t3;
            }
            else if (h < 240) {
                rgb.b = t1;
                rgb.r = t2;
                rgb.g = t1 - t3;
            }
            else if (h < 300) {
                rgb.b = t1;
                rgb.g = t2;
                rgb.r = t2 + t3;
            }
            else if (h < 360) {
                rgb.r = t1;
                rgb.g = t2;
                rgb.b = t1 - t3;
            }
            else {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0;
            }
        }
        return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
    }
    RGBtoHEX(rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        for (var key in hex) {
            if (hex[key].length == 1) {
                hex[key] = '0' + hex[key];
            }
        }
        return hex.join('');
    }
    HSBtoHEX(hsb) {
        return this.RGBtoHEX(this.HSBtoRGB(hsb));
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.overlay = null;
    }
    ngOnDestroy() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
};
ColorPicker.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], ColorPicker.prototype, "style", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "styleClass", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "inline", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "format", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "appendTo", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "disabled", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "tabindex", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "inputId", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "hideTransitionOptions", void 0);
__decorate([
    Output()
], ColorPicker.prototype, "onChange", void 0);
__decorate([
    ViewChild('input', { static: false })
], ColorPicker.prototype, "inputViewChild", void 0);
__decorate([
    ViewChild('colorSelector', { static: false })
], ColorPicker.prototype, "colorSelector", null);
__decorate([
    ViewChild('colorHandle', { static: false })
], ColorPicker.prototype, "colorHandle", null);
__decorate([
    ViewChild('hue', { static: false })
], ColorPicker.prototype, "hue", null);
__decorate([
    ViewChild('hueHandle', { static: false })
], ColorPicker.prototype, "hueHandle", null);
ColorPicker = __decorate([
    Component({
        selector: 'p-colorPicker',
        template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'ui-colorpicker ui-widget':true,'ui-colorpicker-overlay':!inline,'ui-colorpicker-dragging':colorDragging||hueDragging}">
            <input #input type="text" *ngIf="!inline" class="ui-colorpicker-preview ui-inputtext ui-state-default ui-corner-all" readonly="readonly" [ngClass]="{'ui-state-disabled': disabled}"
                (focus)="onInputFocus()" (click)="onInputClick()" (keydown)="onInputKeydown($event)" [attr.id]="inputId" [attr.tabindex]="tabindex" [disabled]="disabled"
                [style.backgroundColor]="inputBgColor">
            <div *ngIf="inline || overlayVisible" [ngClass]="{'ui-colorpicker-panel ui-corner-all': true, 'ui-colorpicker-overlay-panel ui-shadow':!inline, 'ui-state-disabled': disabled}" (click)="onPanelClick()"
                [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)">
                <div class="ui-colorpicker-content">
                    <div #colorSelector class="ui-colorpicker-color-selector" (mousedown)="onColorMousedown($event)">
                        <div class="ui-colorpicker-color">
                            <div #colorHandle class="ui-colorpicker-color-handle"></div>
                        </div>
                    </div>
                    <div #hue class="ui-colorpicker-hue" (mousedown)="onHueMousedown($event)">
                        <div #hueHandle class="ui-colorpicker-hue-handle"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
        animations: [
            trigger('overlayAnimation', [
                state('void', style({
                    transform: 'translateY(5%)',
                    opacity: 0
                })),
                state('visible', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => visible', animate('{{showTransitionParams}}')),
                transition('visible => void', animate('{{hideTransitionParams}}'))
            ])
        ],
        providers: [COLORPICKER_VALUE_ACCESSOR]
    })
], ColorPicker);
export { ColorPicker };
let ColorPickerModule = class ColorPickerModule {
};
ColorPickerModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ColorPicker],
        declarations: [ColorPicker]
    })
], ColorPickerModule);
export { ColorPickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JwaWNrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NvbG9ycGlja2VyLyIsInNvdXJjZXMiOlsiY29sb3JwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3SixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQVE7SUFDN0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUF3Q0YsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQW9FcEIsWUFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVMsRUFBcUI7UUFBeEUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQTVEbEYsV0FBTSxHQUFXLEtBQUssQ0FBQztRQVV2QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsMEJBQXFCLEdBQVcsZ0JBQWdCLENBQUM7UUFFakQsMEJBQXFC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RyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFBO2FBQUM7aUJBQzNDLElBQUcsQ0FBQyxHQUFDLEdBQUcsRUFBRTtnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUE7YUFBQztpQkFDM0MsSUFBRyxDQUFDLEdBQUMsR0FBRyxFQUFFO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQTthQUFDO2lCQUMzQyxJQUFHLENBQUMsR0FBQyxHQUFHLEVBQUU7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFBO2FBQUM7aUJBQzNDLElBQUcsQ0FBQyxHQUFDLEdBQUcsRUFBRTtnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUE7YUFBQztpQkFDM0M7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7YUFBQztTQUNuQztRQUNELE9BQU8sRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxF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QUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO29CQUNuQixTQUFTLEVBQUUsZUFBZTtvQkFDMUIsT0FBTyxFQUFFLENBQUM7aUJBQ2IsQ0FBQyxDQUFDO2dCQUNILFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDbEUsVUFBVSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQ3JFLENBQUM7U0FDTDtRQUNELFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO0tBQzFDLENBQUM7R0FDVyxXQUFXLENBdWZ2QjtTQXZmWSxXQUFXO0FBOGZ4QixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtDQUFJLENBQUE7QUFBckIsaUJBQWlCO0lBTDdCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDdEIsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO0tBQzlCLENBQUM7R0FDVyxpQkFBaUIsQ0FBSTtTQUFyQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IENPTE9SUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDb2xvclBpY2tlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY29sb3JQaWNrZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ0NsYXNzXT1cInsndWktY29sb3JwaWNrZXIgdWktd2lkZ2V0Jzp0cnVlLCd1aS1jb2xvcnBpY2tlci1vdmVybGF5JzohaW5saW5lLCd1aS1jb2xvcnBpY2tlci1kcmFnZ2luZyc6Y29sb3JEcmFnZ2luZ3x8aHVlRHJhZ2dpbmd9XCI+XG4gICAgICAgICAgICA8aW5wdXQgI2lucHV0IHR5cGU9XCJ0ZXh0XCIgKm5nSWY9XCIhaW5saW5lXCIgY2xhc3M9XCJ1aS1jb2xvcnBpY2tlci1wcmV2aWV3IHVpLWlucHV0dGV4dCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIiByZWFkb25seT1cInJlYWRvbmx5XCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6IGRpc2FibGVkfVwiXG4gICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygpXCIgKGNsaWNrKT1cIm9uSW5wdXRDbGljaygpXCIgKGtleWRvd24pPVwib25JbnB1dEtleWRvd24oJGV2ZW50KVwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJpbnB1dEJnQ29sb3JcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpbmxpbmUgfHwgb3ZlcmxheVZpc2libGVcIiBbbmdDbGFzc109XCJ7J3VpLWNvbG9ycGlja2VyLXBhbmVsIHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktY29sb3JwaWNrZXItb3ZlcmxheS1wYW5lbCB1aS1zaGFkb3cnOiFpbmxpbmUsICd1aS1zdGF0ZS1kaXNhYmxlZCc6IGRpc2FibGVkfVwiIChjbGljayk9XCJvblBhbmVsQ2xpY2soKVwiXG4gICAgICAgICAgICAgICAgW0BvdmVybGF5QW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiBbQC5kaXNhYmxlZF09XCJpbmxpbmUgPT09IHRydWVcIiAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jb2xvcnBpY2tlci1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgI2NvbG9yU2VsZWN0b3IgY2xhc3M9XCJ1aS1jb2xvcnBpY2tlci1jb2xvci1zZWxlY3RvclwiIChtb3VzZWRvd24pPVwib25Db2xvck1vdXNlZG93bigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktY29sb3JwaWNrZXItY29sb3JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICNjb2xvckhhbmRsZSBjbGFzcz1cInVpLWNvbG9ycGlja2VyLWNvbG9yLWhhbmRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICNodWUgY2xhc3M9XCJ1aS1jb2xvcnBpY2tlci1odWVcIiAobW91c2Vkb3duKT1cIm9uSHVlTW91c2Vkb3duKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgI2h1ZUhhbmRsZSBjbGFzcz1cInVpLWNvbG9ycGlja2VyLWh1ZS1oYW5kbGVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUlKScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JykpXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtDT0xPUlBJQ0tFUl9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JQaWNrZXIgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgaW5saW5lOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGZvcm1hdDogc3RyaW5nID0gJ2hleCc7XG4gICAgXG4gICAgQElucHV0KCkgYXBwZW5kVG86IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSB0YWJpbmRleDogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcyMjVtcyBlYXNlLW91dCc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxOTVtcyBlYXNlLWluJztcbiAgICBcbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pIGlucHV0Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIHZhbHVlOiBhbnk7XG4gICAgXG4gICAgaW5wdXRCZ0NvbG9yOiBzdHJpbmc7XG4gICAgXG4gICAgc2hvd246IGJvb2xlYW47XG4gICAgXG4gICAgb3ZlcmxheVZpc2libGU6IGJvb2xlYW47XG4gICAgXG4gICAgZGVmYXVsdENvbG9yOiBzdHJpbmcgPSAnZmYwMDAwJztcbiAgICBcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogRnVuY3Rpb247XG4gICAgXG4gICAgZG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcjogRnVuY3Rpb247XG4gICAgXG4gICAgZG9jdW1lbnRNb3VzZXVwTGlzdGVuZXI6IEZ1bmN0aW9uO1xuICAgIFxuICAgIGRvY3VtZW50SHVlTW92ZUxpc3RlbmVyOiBGdW5jdGlvbjtcbiAgICAgICAgICAgICAgICBcbiAgICBzZWxmQ2xpY2s6IGJvb2xlYW47XG4gICAgXG4gICAgY29sb3JEcmFnZ2luZzogYm9vbGVhbjtcbiAgICBcbiAgICBodWVEcmFnZ2luZzogYm9vbGVhbjtcblxuICAgIG92ZXJsYXk6IEhUTUxEaXZFbGVtZW50O1xuXG4gICAgY29sb3JTZWxlY3RvclZpZXdDaGlsZDogRWxlbWVudFJlZjtcbiAgICBcbiAgICBjb2xvckhhbmRsZVZpZXdDaGlsZDogRWxlbWVudFJlZjtcbiAgICBcbiAgICBodWVWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG4gICAgXG4gICAgaHVlSGFuZGxlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuICAgICAgICAgICAgICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG4gICAgICAgIFxuICAgIEBWaWV3Q2hpbGQoJ2NvbG9yU2VsZWN0b3InLCB7IHN0YXRpYzogZmFsc2UgfSkgc2V0IGNvbG9yU2VsZWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmNvbG9yU2VsZWN0b3JWaWV3Q2hpbGQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ2NvbG9ySGFuZGxlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNldCBjb2xvckhhbmRsZShlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuY29sb3JIYW5kbGVWaWV3Q2hpbGQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ2h1ZScsIHsgc3RhdGljOiBmYWxzZSB9KSBzZXQgaHVlKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5odWVWaWV3Q2hpbGQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ2h1ZUhhbmRsZScsIHsgc3RhdGljOiBmYWxzZSB9KSBzZXQgaHVlSGFuZGxlKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5odWVIYW5kbGVWaWV3Q2hpbGQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIG9uSHVlTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmJpbmREb2N1bWVudE1vdXNldXBMaXN0ZW5lcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5odWVEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMucGlja0h1ZShldmVudCk7XG4gICAgfVxuICAgIFxuICAgIHBpY2tIdWUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IHRvcDogbnVtYmVyID0gdGhpcy5odWVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbGlkYXRlSFNCKHtcbiAgICAgICAgICAgIGg6IE1hdGguZmxvb3IoMzYwICogKDE1MCAtIE1hdGgubWF4KDAsIE1hdGgubWluKDE1MCwgKGV2ZW50LnBhZ2VZIC0gdG9wKSkpKSAvIDE1MCksXG4gICAgICAgICAgICBzOiB0aGlzLnZhbHVlLnMsXG4gICAgICAgICAgICBiOiB0aGlzLnZhbHVlLmJcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZUNvbG9yU2VsZWN0b3IoKTtcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLmdldFZhbHVlVG9VcGRhdGUoKX0pO1xuICAgIH1cbiAgICBcbiAgICBvbkNvbG9yTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmJpbmREb2N1bWVudE1vdXNldXBMaXN0ZW5lcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb2xvckRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5waWNrQ29sb3IoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICBwaWNrQ29sb3IoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmNvbG9yU2VsZWN0b3JWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHRvcCA9IHJlY3QudG9wICsgKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApO1xuICAgICAgICBsZXQgbGVmdCA9IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgbGV0IHNhdHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMCAqIChNYXRoLm1heCgwLCBNYXRoLm1pbigxNTAsIChldmVudC5wYWdlWCAtIGxlZnQpKSkpIC8gMTUwKTtcbiAgICAgICAgbGV0IGJyaWdodG5lc3MgPSBNYXRoLmZsb29yKDEwMCAqICgxNTAgLSBNYXRoLm1heCgwLCBNYXRoLm1pbigxNTAsIChldmVudC5wYWdlWSAtIHRvcCkpKSkgLyAxNTApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWxpZGF0ZUhTQih7XG4gICAgICAgICAgICBoOiB0aGlzLnZhbHVlLmgsXG4gICAgICAgICAgICBzOiBzYXR1cmF0aW9uLFxuICAgICAgICAgICAgYjogYnJpZ2h0bmVzc1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlVUkoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbCgpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy5nZXRWYWx1ZVRvVXBkYXRlKCl9KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0VmFsdWVUb1VwZGF0ZSgpIHtcbiAgICAgICAgbGV0IHZhbDogYW55O1xuICAgICAgICBzd2l0Y2godGhpcy5mb3JtYXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgICAgICAgICAgdmFsID0gJyMnICsgdGhpcy5IU0J0b0hFWCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlICdyZ2InOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuSFNCdG9SR0IodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAnaHNiJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZU1vZGVsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5nZXRWYWx1ZVRvVXBkYXRlKCkpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZih2YWx1ZSkge1xuICAgICAgICAgICAgc3dpdGNoKHRoaXMuZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuSEVYdG9IU0IodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhc2UgJ3JnYic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLlJHQnRvSFNCKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYXNlICdoc2InOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5IRVh0b0hTQih0aGlzLmRlZmF1bHRDb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlQ29sb3JTZWxlY3RvcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZUNvbG9yU2VsZWN0b3IoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbG9yU2VsZWN0b3JWaWV3Q2hpbGQpIHtcbiAgICAgICAgICAgIGNvbnN0IGhzYjogYW55ID0ge307XG4gICAgICAgICAgICBoc2IucyA9IDEwMDtcbiAgICAgICAgICAgIGhzYi5iID0gMTAwO1xuICAgICAgICAgICAgaHNiLmggPSB0aGlzLnZhbHVlLmg7XG5cbiAgICAgICAgICAgIHRoaXMuY29sb3JTZWxlY3RvclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjJyArIHRoaXMuSFNCdG9IRVgoaHNiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgdXBkYXRlVUkoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbG9ySGFuZGxlVmlld0NoaWxkICYmIHRoaXMuaHVlSGFuZGxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3JIYW5kbGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gIE1hdGguZmxvb3IoMTUwICogdGhpcy52YWx1ZS5zIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLmNvbG9ySGFuZGxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gIE1hdGguZmxvb3IoMTUwICogKDEwMCAtIHRoaXMudmFsdWUuYikgLyAxMDApICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuaHVlSGFuZGxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5mbG9vcigxNTAgLSAoMTUwICogdGhpcy52YWx1ZS5oIC8gMzYwKSkgKyAncHgnO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlucHV0QmdDb2xvciA9ICcjJyArIHRoaXMuSFNCdG9IRVgodGhpcy52YWx1ZSk7XG4gICAgfVxuICAgIFxuICAgIG9uSW5wdXRGb2N1cygpIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIH1cbiAgICBcbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5ID0gZXZlbnQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbG9yU2VsZWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXksIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZU92ZXJsYXlBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYWxpZ25PdmVybGF5KCkge1xuICAgICAgICBpZih0aGlzLmFwcGVuZFRvKVxuICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgRG9tSGFuZGxlci5yZWxhdGl2ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICAgICAgIFxuICAgIG9uSW5wdXRDbGljaygpIHtcbiAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSB0cnVlO1xuICAgICAgICB0aGlzLnRvZ2dsZVBhbmVsKCk7XG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZVBhbmVsKCkge1xuICAgICAgICBpZighdGhpcy5vdmVybGF5VmlzaWJsZSlcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gICAgXG4gICAgb25JbnB1dEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL3NwYWNlXG4gICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlUGFuZWwoKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vZXNjYXBlIGFuZCB0YWJcbiAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZXk/XCIpXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgb25QYW5lbENsaWNrKCkge1xuICAgICAgICB0aGlzLnNlbGZDbGljayA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuICAgIFxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgfVxuICAgIFxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuc2VsZkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gICAgXG4gICAgfVxuICAgIFxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYmluZERvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmKCF0aGlzLmRvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZW1vdmUnLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbG9yRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrQ29sb3IoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZih0aGlzLmh1ZURyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja0h1ZShldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdW5iaW5kRG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYodGhpcy5kb2N1bWVudE1vdXNlbW92ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYmluZERvY3VtZW50TW91c2V1cExpc3RlbmVyKCkge1xuICAgICAgICBpZighdGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaHVlRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50TW91c2V1cExpc3RlbmVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1bmJpbmREb2N1bWVudE1vdXNldXBMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYodGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZUhTQihoc2IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGg6IE1hdGgubWluKDM2MCwgTWF0aC5tYXgoMCwgaHNiLmgpKSxcbiAgICAgICAgICAgIHM6IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgaHNiLnMpKSxcbiAgICAgICAgICAgIGI6IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgaHNiLmIpKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICB2YWxpZGF0ZVJHQihyZ2IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgcmdiLnIpKSxcbiAgICAgICAgICAgIGc6IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgcmdiLmcpKSxcbiAgICAgICAgICAgIGI6IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgcmdiLmIpKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICB2YWxpZGF0ZUhFWChoZXgpIHtcbiAgICAgICAgdmFyIGxlbiA9IDYgLSBoZXgubGVuZ3RoO1xuICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgdmFyIG8gPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIG8ucHVzaCgnMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgby5wdXNoKGhleCk7XG4gICAgICAgICAgICBoZXggPSBvLmpvaW4oJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZXg7XG4gICAgfVxuICAgIFxuICAgIEhFWHRvUkdCKGhleCkge1xuICAgICAgICBsZXQgaGV4VmFsdWUgPSBwYXJzZUludCgoKGhleC5pbmRleE9mKCcjJykgPiAtMSkgPyBoZXguc3Vic3RyaW5nKDEpIDogaGV4KSwgMTYpO1xuICAgICAgICByZXR1cm4ge3I6IGhleFZhbHVlID4+IDE2LCBnOiAoaGV4VmFsdWUgJiAweDAwRkYwMCkgPj4gOCwgYjogKGhleFZhbHVlICYgMHgwMDAwRkYpfTtcbiAgICB9XG4gICAgXG4gICAgSEVYdG9IU0IoaGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLlJHQnRvSFNCKHRoaXMuSEVYdG9SR0IoaGV4KSk7XG4gICAgfVxuICAgIFxuICAgIFJHQnRvSFNCKHJnYikge1xuICAgICAgICB2YXIgaHNiID0ge1xuICAgICAgICAgICAgaDogMCxcbiAgICAgICAgICAgIHM6IDAsXG4gICAgICAgICAgICBiOiAwXG4gICAgICAgIH07XG4gICAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyZ2IuciwgcmdiLmcsIHJnYi5iKTtcbiAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4KHJnYi5yLCByZ2IuZywgcmdiLmIpO1xuICAgICAgICB2YXIgZGVsdGEgPSBtYXggLSBtaW47XG4gICAgICAgIGhzYi5iID0gbWF4O1xuICAgICAgICBpZiAobWF4ICE9IDApIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGhzYi5zID0gbWF4ICE9IDAgPyAyNTUgKiBkZWx0YSAvIG1heCA6IDA7XG4gICAgICAgIGlmIChoc2IucyAhPSAwKSB7XG4gICAgICAgICAgICBpZiAocmdiLnIgPT0gbWF4KSB7XG4gICAgICAgICAgICAgICAgaHNiLmggPSAocmdiLmcgLSByZ2IuYikgLyBkZWx0YTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmdiLmcgPT0gbWF4KSB7XG4gICAgICAgICAgICAgICAgaHNiLmggPSAyICsgKHJnYi5iIC0gcmdiLnIpIC8gZGVsdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhzYi5oID0gNCArIChyZ2IuciAtIHJnYi5nKSAvIGRlbHRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaHNiLmggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBoc2IuaCAqPSA2MDtcbiAgICAgICAgaWYgKGhzYi5oIDwgMCkge1xuICAgICAgICAgICAgaHNiLmggKz0gMzYwO1xuICAgICAgICB9XG4gICAgICAgIGhzYi5zICo9IDEwMC8yNTU7XG4gICAgICAgIGhzYi5iICo9IDEwMC8yNTU7XG4gICAgICAgIHJldHVybiBoc2I7XG4gICAgfVxuICAgIFxuICAgIEhTQnRvUkdCKGhzYikge1xuICAgICAgICB2YXIgcmdiID0ge1xuICAgICAgICAgICAgcjogbnVsbCwgZzogbnVsbCwgYjogbnVsbFxuICAgICAgICB9O1xuICAgICAgICBsZXQgaDogbnVtYmVyID0gaHNiLmg7XG4gICAgICAgIGxldCBzOiBudW1iZXIgPSBoc2IucyoyNTUvMTAwO1xuICAgICAgICBsZXQgdjogbnVtYmVyID0gaHNiLmIqMjU1LzEwMDtcbiAgICAgICAgaWYocyA9PSAwKSB7XG4gICAgICAgICAgICByZ2IgPSB7XG4gICAgICAgICAgICAgICAgcjogdixcbiAgICAgICAgICAgICAgICBnOiB2LFxuICAgICAgICAgICAgICAgIGI6IHZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgdDE6IG51bWJlciA9IHY7XG4gICAgICAgICAgICBsZXQgdDI6IG51bWJlciA9ICgyNTUtcykqdi8yNTU7XG4gICAgICAgICAgICBsZXQgdDM6IG51bWJlciA9ICh0MS10MikqKGglNjApLzYwO1xuICAgICAgICAgICAgaWYoaD09MzYwKSBoID0gMDtcbiAgICAgICAgICAgIGlmKGg8NjApIHtyZ2Iucj10MTtcdHJnYi5iPXQyOyByZ2IuZz10Mit0M31cbiAgICAgICAgICAgIGVsc2UgaWYoaDwxMjApIHtyZ2IuZz10MTsgcmdiLmI9dDI7XHRyZ2Iucj10MS10M31cbiAgICAgICAgICAgIGVsc2UgaWYoaDwxODApIHtyZ2IuZz10MTsgcmdiLnI9dDI7XHRyZ2IuYj10Mit0M31cbiAgICAgICAgICAgIGVsc2UgaWYoaDwyNDApIHtyZ2IuYj10MTsgcmdiLnI9dDI7XHRyZ2IuZz10MS10M31cbiAgICAgICAgICAgIGVsc2UgaWYoaDwzMDApIHtyZ2IuYj10MTsgcmdiLmc9dDI7XHRyZ2Iucj10Mit0M31cbiAgICAgICAgICAgIGVsc2UgaWYoaDwzNjApIHtyZ2Iucj10MTsgcmdiLmc9dDI7XHRyZ2IuYj10MS10M31cbiAgICAgICAgICAgIGVsc2Uge3JnYi5yPTA7IHJnYi5nPTA7XHRyZ2IuYj0wfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7cjpNYXRoLnJvdW5kKHJnYi5yKSwgZzpNYXRoLnJvdW5kKHJnYi5nKSwgYjpNYXRoLnJvdW5kKHJnYi5iKX07XG4gICAgfVxuICAgIFxuICAgIFJHQnRvSEVYKHJnYikge1xuICAgICAgICB2YXIgaGV4ID0gW1xuICAgICAgICAgICAgcmdiLnIudG9TdHJpbmcoMTYpLFxuICAgICAgICAgICAgcmdiLmcudG9TdHJpbmcoMTYpLFxuICAgICAgICAgICAgcmdiLmIudG9TdHJpbmcoMTYpXG4gICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGtleSBpbiBoZXgpIHtcbiAgICAgICAgICAgIGlmKGhleFtrZXldLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgaGV4W2tleV0gPSAnMCcgKyBoZXhba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAgICAgICAgXG5cbiAgICAgICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbiAgICB9XG4gICAgXG4gICAgSFNCdG9IRVgoaHNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLlJHQnRvSEVYKHRoaXMuSFNCdG9SR0IoaHNiKSk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5SGlkZSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVzdG9yZU92ZXJsYXlBcHBlbmQoKTtcbiAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtDb2xvclBpY2tlcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ29sb3JQaWNrZXJdXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yUGlja2VyTW9kdWxlIHsgfVxuIl19