var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
export class BasePanelMenuItem {
    constructor(ref) {
        this.ref = ref;
    }
    handleClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        item.expanded = !item.expanded;
        this.ref.detectChanges();
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }
}
let PanelMenuSub = class PanelMenuSub extends BasePanelMenuItem {
    constructor(ref) {
        super(ref);
    }
};
PanelMenuSub.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], PanelMenuSub.prototype, "item", void 0);
__decorate([
    Input()
], PanelMenuSub.prototype, "expanded", void 0);
__decorate([
    Input()
], PanelMenuSub.prototype, "transitionOptions", void 0);
PanelMenuSub = __decorate([
    Component({
        selector: 'p-panelMenuSub',
        template: `
        <ul class="ui-submenu-list" [@submenu]="expanded ? {value: 'visible', params: {transitionParams: transitionOptions, height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}">
            <ng-template ngFor let-child [ngForOf]="item.items">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content">
                <li *ngIf="!child.separator" class="ui-menuitem ui-corner-all" [ngClass]="child.styleClass" [class.ui-helper-hidden]="child.visible === false" [ngStyle]="child.style">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.tabindex]="item.expanded ? null : child.tabindex ? child.tabindex : '-1'" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled, 'ui-state-active': child.expanded}" 
                        (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title">
                        <span class="ui-panelmenu-icon pi pi-fw" [ngClass]="{'pi-caret-right':!child.expanded,'pi-caret-down':child.expanded}" *ngIf="child.items"></span
                        ><span class="ui-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon"></span
                        ><span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" 
                        [ngClass]="{'ui-state-disabled':child.disabled}" [attr.tabindex]="item.expanded ? null : child.tabindex ? child.tabindex : '-1'" [attr.id]="child.id"
                        (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title">
                        <span class="ui-panelmenu-icon pi pi-fw" [ngClass]="{'pi-caret-right':!child.expanded,'pi-caret-down':child.expanded}" *ngIf="child.items"></span
                        ><span class="ui-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon"></span
                        ><span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <p-panelMenuSub [item]="child" [expanded]="child.expanded" [transitionOptions]="transitionOptions" *ngIf="child.items"></p-panelMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
        animations: [
            trigger('submenu', [
                state('hidden', style({
                    height: '0px'
                })),
                state('void', style({
                    height: '{{height}}'
                }), { params: { height: '0' } }),
                state('visible', style({
                    height: '*'
                })),
                transition('visible => hidden', animate('{{transitionParams}}')),
                transition('hidden => visible', animate('{{transitionParams}}')),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ]
    })
], PanelMenuSub);
export { PanelMenuSub };
let PanelMenu = class PanelMenu extends BasePanelMenuItem {
    constructor(ref) {
        super(ref);
        this.multiple = true;
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    }
    collapseAll() {
        for (let item of this.model) {
            if (item.expanded) {
                item.expanded = false;
            }
        }
    }
    handleClick(event, item) {
        if (!this.multiple) {
            for (let modelItem of this.model) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }
        this.animating = true;
        super.handleClick(event, item);
    }
    onToggleDone() {
        this.animating = false;
    }
};
PanelMenu.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], PanelMenu.prototype, "model", void 0);
__decorate([
    Input()
], PanelMenu.prototype, "style", void 0);
__decorate([
    Input()
], PanelMenu.prototype, "styleClass", void 0);
__decorate([
    Input()
], PanelMenu.prototype, "multiple", void 0);
__decorate([
    Input()
], PanelMenu.prototype, "transitionOptions", void 0);
PanelMenu = __decorate([
    Component({
        selector: 'p-panelMenu',
        template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-panelmenu ui-widget'">
            <ng-container *ngFor="let item of model;let f=first;let l=last;">
                <div class="ui-panelmenu-panel" [ngClass]="{'ui-helper-hidden': item.visible === false}">
                    <div [ngClass]="{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-top':f,'ui-corner-bottom':l&&!item.expanded,
                    'ui-state-active':item.expanded,'ui-state-disabled':item.disabled}" [class]="item.styleClass" [ngStyle]="item.style">
                        <a *ngIf="!item.routerLink" [href]="item.url||'#'" (click)="handleClick($event,item)" [attr.tabindex]="item.tabindex ? item.tabindex : '0'" [attr.id]="item.id"
                           [attr.target]="item.target" [attr.title]="item.title" class="ui-panelmenu-header-link">
                        <span *ngIf="item.items" class="ui-panelmenu-icon pi pi-fw" [ngClass]="{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}"></span
                        ><span class="ui-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span
                        ><span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}"
                           (click)="handleClick($event,item)" [attr.target]="item.target" [attr.title]="item.title" class="ui-panelmenu-header-link" [attr.id]="item.id" [attr.tabindex]="item.tabindex ? item.tabindex : '0'">
                        <span *ngIf="item.items" class="ui-panelmenu-icon pi pi-fw" [ngClass]="{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}"></span
                        ><span class="ui-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span
                        ><span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </div>
                    <div *ngIf="item.items" class="ui-panelmenu-content-wrapper" [@rootItem]="item.expanded ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}"  (@rootItem.done)="onToggleDone()"
                         [ngClass]="{'ui-panelmenu-content-wrapper-overflown': !item.expanded||animating}">
                        <div class="ui-panelmenu-content ui-widget-content">
                            <p-panelMenuSub [item]="item" [expanded]="true" [transitionOptions]="transitionOptions" class="ui-panelmenu-root-submenu"></p-panelMenuSub>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `,
        animations: [
            trigger('rootItem', [
                state('hidden', style({
                    height: '0px'
                })),
                state('void', style({
                    height: '{{height}}'
                }), { params: { height: '0' } }),
                state('visible', style({
                    height: '*'
                })),
                transition('visible => hidden', animate('{{transitionParams}}')),
                transition('hidden => visible', animate('{{transitionParams}}')),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ]
    })
], PanelMenu);
export { PanelMenu };
let PanelMenuModule = class PanelMenuModule {
};
PanelMenuModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [PanelMenu, RouterModule],
        declarations: [PanelMenu, PanelMenuSub]
    })
], PanelMenuModule);
export { PanelMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWxtZW51LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wYW5lbG1lbnUvIiwic291cmNlcyI6WyJwYW5lbG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxNQUFNLE9BQU8saUJBQWlCO0lBRTFCLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQUcsQ0FBQztJQUU5QyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDbkIsSUFBRyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFekIsSUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsSUFBSTthQUNiLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztDQUNKO0FBOENELElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxpQkFBaUI7SUFRL0MsWUFBWSxHQUFzQjtRQUM5QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTs7WUFIb0IsaUJBQWlCOztBQU56QjtJQUFSLEtBQUssRUFBRTswQ0FBZ0I7QUFFZjtJQUFSLEtBQUssRUFBRTs4Q0FBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7dURBQTJCO0FBTjFCLFlBQVk7SUE1Q3hCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVCVDtRQUNELFVBQVUsRUFBRTtZQUNSLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0JBQ2YsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7b0JBQ2xCLE1BQU0sRUFBRSxLQUFLO2lCQUNoQixDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7b0JBQ2hCLE1BQU0sRUFBRSxZQUFZO2lCQUN2QixDQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLEVBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7b0JBQ25CLE1BQU0sRUFBRSxHQUFHO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxVQUFVLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ2hFLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDaEUsVUFBVSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUM3RCxVQUFVLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDakUsQ0FBQztTQUNMO0tBQ0osQ0FBQztHQUNXLFlBQVksQ0FXeEI7U0FYWSxZQUFZO0FBOER6QixJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsaUJBQWlCO0lBYzVDLFlBQVksR0FBc0I7UUFDOUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBUE4sYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6QixzQkFBaUIsR0FBVyxzQ0FBc0MsQ0FBQztJQU01RSxDQUFDO0lBRUQsV0FBVztRQUNWLEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixJQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3RCO1NBQ0Q7SUFDRixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ3RCLElBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1osS0FBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNuQyxJQUFHLElBQUksS0FBSyxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRTtvQkFDNUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7aUJBQzNCO2FBQ0Q7U0FDSjtRQUVFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztDQUVKLENBQUE7O1lBN0JvQixpQkFBaUI7O0FBWnpCO0lBQVIsS0FBSyxFQUFFO3dDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTt3Q0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFOzZDQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTsyQ0FBMEI7QUFFekI7SUFBUixLQUFLLEVBQUU7b0RBQW9FO0FBVm5FLFNBQVM7SUFqRHJCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTRCVDtRQUNELFVBQVUsRUFBRTtZQUNSLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQ2hCLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO29CQUNsQixNQUFNLEVBQUUsS0FBSztpQkFDaEIsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO29CQUNoQixNQUFNLEVBQUUsWUFBWTtpQkFDdkIsQ0FBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxFQUFDLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO29CQUNuQixNQUFNLEVBQUUsR0FBRztpQkFDZCxDQUFDLENBQUM7Z0JBQ0gsVUFBVSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNoRSxVQUFVLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ2hFLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDN0QsVUFBVSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2FBQ2pFLENBQUM7U0FDTDtLQUNKLENBQUM7R0FDVyxTQUFTLENBMkNyQjtTQTNDWSxTQUFTO0FBa0R0QixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0NBQUksQ0FBQTtBQUFuQixlQUFlO0lBTDNCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7UUFDcEMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQztRQUNqQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUMsWUFBWSxDQUFDO0tBQ3pDLENBQUM7R0FDVyxlQUFlLENBQUk7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuZXhwb3J0IGNsYXNzIEJhc2VQYW5lbE1lbnVJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cbiAgICAgICAgXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQsIGl0ZW0pIHtcbiAgICAgICAgaWYoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaXRlbS5leHBhbmRlZCA9ICFpdGVtLmV4cGFuZGVkO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIFxuICAgICAgICBpZighaXRlbS51cmwpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtcGFuZWxNZW51U3ViJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWwgY2xhc3M9XCJ1aS1zdWJtZW51LWxpc3RcIiBbQHN1Ym1lbnVdPVwiZXhwYW5kZWQgPyB7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogdHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJyonfX0gOiB7dmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiB0cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnMCd9fVwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jaGlsZCBbbmdGb3JPZl09XCJpdGVtLml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2hpbGQuc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiBjbGFzcz1cInVpLW1lbnVpdGVtIHVpLWNvcm5lci1hbGxcIiBbbmdDbGFzc109XCJjaGlsZC5zdHlsZUNsYXNzXCIgW2NsYXNzLnVpLWhlbHBlci1oaWRkZW5dPVwiY2hpbGQudmlzaWJsZSA9PT0gZmFsc2VcIiBbbmdTdHlsZV09XCJjaGlsZC5zdHlsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFjaGlsZC5yb3V0ZXJMaW5rXCIgW2hyZWZdPVwiY2hpbGQudXJsfHwnIydcIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZXhwYW5kZWQgPyBudWxsIDogY2hpbGQudGFiaW5kZXggPyBjaGlsZC50YWJpbmRleCA6ICctMSdcIiBbYXR0ci5pZF09XCJjaGlsZC5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZCwgJ3VpLXN0YXRlLWFjdGl2ZSc6IGNoaWxkLmV4cGFuZGVkfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCxjaGlsZClcIiBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFuZWxtZW51LWljb24gcGkgcGktZndcIiBbbmdDbGFzc109XCJ7J3BpLWNhcmV0LXJpZ2h0JzohY2hpbGQuZXhwYW5kZWQsJ3BpLWNhcmV0LWRvd24nOmNoaWxkLmV4cGFuZGVkfVwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCIgKm5nSWY9XCJjaGlsZC5pY29uXCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiY2hpbGQucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cImNoaWxkLnJvdXRlckxpbmtcIiBbcXVlcnlQYXJhbXNdPVwiY2hpbGQucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIndWktc3RhdGUtYWN0aXZlJ1wiIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJjaGlsZC5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLmV4cGFuZGVkID8gbnVsbCA6IGNoaWxkLnRhYmluZGV4ID8gY2hpbGQudGFiaW5kZXggOiAnLTEnXCIgW2F0dHIuaWRdPVwiY2hpbGQuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCxjaGlsZClcIiBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFuZWxtZW51LWljb24gcGkgcGktZndcIiBbbmdDbGFzc109XCJ7J3BpLWNhcmV0LXJpZ2h0JzohY2hpbGQuZXhwYW5kZWQsJ3BpLWNhcmV0LWRvd24nOmNoaWxkLmV4cGFuZGVkfVwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCIgKm5nSWY9XCJjaGlsZC5pY29uXCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxwLXBhbmVsTWVudVN1YiBbaXRlbV09XCJjaGlsZFwiIFtleHBhbmRlZF09XCJjaGlsZC5leHBhbmRlZFwiIFt0cmFuc2l0aW9uT3B0aW9uc109XCJ0cmFuc2l0aW9uT3B0aW9uc1wiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3AtcGFuZWxNZW51U3ViPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdzdWJtZW51JywgW1xuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwcHgnXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICd7e2hlaWdodH19J1xuICAgICAgICAgICAgfSksIHtwYXJhbXM6IHtoZWlnaHQ6ICcwJ319KSxcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJyonXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51U3ViIGV4dGVuZHMgQmFzZVBhbmVsTWVudUl0ZW0ge1xuICAgIFxuICAgIEBJbnB1dCgpIGl0ZW06IE1lbnVJdGVtO1xuICAgIFxuICAgIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIocmVmKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIid1aS1wYW5lbG1lbnUgdWktd2lkZ2V0J1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbDtsZXQgZj1maXJzdDtsZXQgbD1sYXN0O1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtcGFuZWxcIiBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiBpdGVtLnZpc2libGUgPT09IGZhbHNlfVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktd2lkZ2V0IHVpLXBhbmVsbWVudS1oZWFkZXIgdWktc3RhdGUtZGVmYXVsdCc6dHJ1ZSwndWktY29ybmVyLXRvcCc6ZiwndWktY29ybmVyLWJvdHRvbSc6bCYmIWl0ZW0uZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1zdGF0ZS1hY3RpdmUnOml0ZW0uZXhwYW5kZWQsJ3VpLXN0YXRlLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiIFtjbGFzc109XCJpdGVtLnN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJpdGVtLnN0eWxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFpdGVtLnJvdXRlckxpbmtcIiBbaHJlZl09XCJpdGVtLnVybHx8JyMnXCIgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCxpdGVtKVwiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0udGFiaW5kZXggPyBpdGVtLnRhYmluZGV4IDogJzAnXCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtaGVhZGVyLWxpbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5pdGVtc1wiIGNsYXNzPVwidWktcGFuZWxtZW51LWljb24gcGkgcGktZndcIiBbbmdDbGFzc109XCJ7J3BpLWNoZXZyb24tcmlnaHQnOiFpdGVtLmV4cGFuZGVkLCdwaS1jaGV2cm9uLWRvd24nOml0ZW0uZXhwYW5kZWR9XCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIj48L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW3JvdXRlckxpbmtdPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIndWktc3RhdGUtYWN0aXZlJ1wiIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsaXRlbSlcIiBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtaGVhZGVyLWxpbmtcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5pdGVtc1wiIGNsYXNzPVwidWktcGFuZWxtZW51LWljb24gcGkgcGktZndcIiBbbmdDbGFzc109XCJ7J3BpLWNoZXZyb24tcmlnaHQnOiFpdGVtLmV4cGFuZGVkLCdwaS1jaGV2cm9uLWRvd24nOml0ZW0uZXhwYW5kZWR9XCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIj48L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtLml0ZW1zXCIgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtY29udGVudC13cmFwcGVyXCIgW0Byb290SXRlbV09XCJpdGVtLmV4cGFuZGVkID8ge3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3RyYW5zaXRpb25QYXJhbXM6IGFuaW1hdGluZyA/IHRyYW5zaXRpb25PcHRpb25zIDogJzBtcycsIGhlaWdodDogJyonfX0gOiB7dmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiB0cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnMCd9fVwiICAoQHJvb3RJdGVtLmRvbmUpPVwib25Ub2dnbGVEb25lKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktcGFuZWxtZW51LWNvbnRlbnQtd3JhcHBlci1vdmVyZmxvd24nOiAhaXRlbS5leHBhbmRlZHx8YW5pbWF0aW5nfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXBhbmVsbWVudS1jb250ZW50IHVpLXdpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtcGFuZWxNZW51U3ViIFtpdGVtXT1cIml0ZW1cIiBbZXhwYW5kZWRdPVwidHJ1ZVwiIFt0cmFuc2l0aW9uT3B0aW9uc109XCJ0cmFuc2l0aW9uT3B0aW9uc1wiIGNsYXNzPVwidWktcGFuZWxtZW51LXJvb3Qtc3VibWVudVwiPjwvcC1wYW5lbE1lbnVTdWI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3Jvb3RJdGVtJywgW1xuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwcHgnXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICd7e2hlaWdodH19J1xuICAgICAgICAgICAgfSksIHtwYXJhbXM6IHtoZWlnaHQ6ICcwJ319KSxcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJyonXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51IGV4dGVuZHMgQmFzZVBhbmVsTWVudUl0ZW0ge1xuICAgIFxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnNDAwbXMgY3ViaWMtYmV6aWVyKDAuODYsIDAsIDAuMDcsIDEpJztcbiAgICBcbiAgICBwdWJsaWMgYW5pbWF0aW5nOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihyZWYpO1xuICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICBjb2xsYXBzZUFsbCgpIHtcbiAgICBcdGZvcihsZXQgaXRlbSBvZiB0aGlzLm1vZGVsKSB7XG4gICAgXHRcdGlmKGl0ZW0uZXhwYW5kZWQpIHtcbiAgICBcdFx0XHRpdGVtLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgXHRcdH1cbiAgICBcdH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCwgaXRlbSkge1xuICAgIFx0aWYoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbW9kZWxJdGVtIG9mIHRoaXMubW9kZWwpIHtcbiAgICAgICAgXHRcdGlmKGl0ZW0gIT09IG1vZGVsSXRlbSAmJiBtb2RlbEl0ZW0uZXhwYW5kZWQpIHtcbiAgICAgICAgXHRcdFx0bW9kZWxJdGVtLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIFx0XHR9XG4gICAgICAgIFx0fVxuICAgIFx0fVxuICAgICAgICBcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICBzdXBlci5oYW5kbGVDbGljayhldmVudCwgaXRlbSk7XG4gICAgfVxuICAgIFxuICAgIG9uVG9nZ2xlRG9uZSgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJvdXRlck1vZHVsZV0sXG4gICAgZXhwb3J0czogW1BhbmVsTWVudSxSb3V0ZXJNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1BhbmVsTWVudSxQYW5lbE1lbnVTdWJdXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsTWVudU1vZHVsZSB7IH1cbiJdfQ==