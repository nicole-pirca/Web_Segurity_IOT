var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, HostListener, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, Directive, Optional, AfterContentInit, Input, Output, EventEmitter, ElementRef, ContentChildren, TemplateRef, QueryList, ViewChild, NgZone, EmbeddedViewRef, ViewContainerRef, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterUtils } from 'primeng/utils';
var TableService = /** @class */ (function () {
    function TableService() {
        this.sortSource = new Subject();
        this.selectionSource = new Subject();
        this.contextMenuSource = new Subject();
        this.valueSource = new Subject();
        this.totalRecordsSource = new Subject();
        this.columnsSource = new Subject();
        this.sortSource$ = this.sortSource.asObservable();
        this.selectionSource$ = this.selectionSource.asObservable();
        this.contextMenuSource$ = this.contextMenuSource.asObservable();
        this.valueSource$ = this.valueSource.asObservable();
        this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
        this.columnsSource$ = this.columnsSource.asObservable();
    }
    TableService.prototype.onSort = function (sortMeta) {
        this.sortSource.next(sortMeta);
    };
    TableService.prototype.onSelectionChange = function () {
        this.selectionSource.next();
    };
    TableService.prototype.onContextMenu = function (data) {
        this.contextMenuSource.next(data);
    };
    TableService.prototype.onValueChange = function (value) {
        this.valueSource.next(value);
    };
    TableService.prototype.onTotalRecordsChange = function (value) {
        this.totalRecordsSource.next(value);
    };
    TableService.prototype.onColumnsChange = function (columns) {
        this.columnsSource.next(columns);
    };
    TableService = __decorate([
        Injectable()
    ], TableService);
    return TableService;
}());
export { TableService };
var Table = /** @class */ (function () {
    function Table(el, zone, tableService, cd) {
        this.el = el;
        this.zone = zone;
        this.tableService = tableService;
        this.cd = cd;
        this.pageLinks = 5;
        this.alwaysShowPaginator = true;
        this.paginatorPosition = 'bottom';
        this.paginatorDropdownScrollHeight = '200px';
        this.currentPageReportTemplate = '{currentPage} of {totalPages}';
        this.defaultSortOrder = 1;
        this.sortMode = 'single';
        this.resetPageOnSort = true;
        this.selectionChange = new EventEmitter();
        this.contextMenuSelectionChange = new EventEmitter();
        this.contextMenuSelectionMode = "separate";
        this.rowTrackBy = function (index, item) { return item; };
        this.lazy = false;
        this.lazyLoadOnInit = true;
        this.compareSelectionBy = 'deepEquals';
        this.csvSeparator = ',';
        this.exportFilename = 'download';
        this.filters = {};
        this.filterDelay = 300;
        this.expandedRowKeys = {};
        this.editingRowKeys = {};
        this.rowExpandMode = 'multiple';
        this.virtualScrollDelay = 150;
        this.virtualRowHeight = 28;
        this.columnResizeMode = 'fit';
        this.loadingIcon = 'pi pi-spinner';
        this.showLoader = true;
        this.stateStorage = 'session';
        this.editMode = 'cell';
        this.onRowSelect = new EventEmitter();
        this.onRowUnselect = new EventEmitter();
        this.onPage = new EventEmitter();
        this.onSort = new EventEmitter();
        this.onFilter = new EventEmitter();
        this.onLazyLoad = new EventEmitter();
        this.onRowExpand = new EventEmitter();
        this.onRowCollapse = new EventEmitter();
        this.onContextMenuSelect = new EventEmitter();
        this.onColResize = new EventEmitter();
        this.onColReorder = new EventEmitter();
        this.onRowReorder = new EventEmitter();
        this.onEditInit = new EventEmitter();
        this.onEditComplete = new EventEmitter();
        this.onEditCancel = new EventEmitter();
        this.onHeaderCheckboxToggle = new EventEmitter();
        this.sortFunction = new EventEmitter();
        this.firstChange = new EventEmitter();
        this.rowsChange = new EventEmitter();
        this.onStateSave = new EventEmitter();
        this.onStateRestore = new EventEmitter();
        this._value = [];
        this._totalRecords = 0;
        this._first = 0;
        this.selectionKeys = {};
        this._sortOrder = 1;
    }
    Table.prototype.ngOnInit = function () {
        if (this.lazy && this.lazyLoadOnInit) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
        }
        this.initialized = true;
    };
    Table.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'caption':
                    _this.captionTemplate = item.template;
                    break;
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'loadingbody':
                    _this.loadingBodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'summary':
                    _this.summaryTemplate = item.template;
                    break;
                case 'colgroup':
                    _this.colGroupTemplate = item.template;
                    break;
                case 'rowexpansion':
                    _this.expandedRowTemplate = item.template;
                    break;
                case 'frozenrows':
                    _this.frozenRowsTemplate = item.template;
                    break;
                case 'frozenheader':
                    _this.frozenHeaderTemplate = item.template;
                    break;
                case 'frozenbody':
                    _this.frozenBodyTemplate = item.template;
                    break;
                case 'frozenfooter':
                    _this.frozenFooterTemplate = item.template;
                    break;
                case 'frozencolgroup':
                    _this.frozenColGroupTemplate = item.template;
                    break;
                case 'emptymessage':
                    _this.emptyMessageTemplate = item.template;
                    break;
                case 'paginatorleft':
                    _this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    _this.paginatorRightTemplate = item.template;
                    break;
            }
        });
    };
    Table.prototype.ngAfterViewInit = function () {
        if (this.isStateful() && this.resizableColumns) {
            this.restoreColumnWidths();
        }
    };
    Table.prototype.ngOnChanges = function (simpleChange) {
        if (simpleChange.value) {
            if (this.isStateful() && !this.stateRestored) {
                this.restoreState();
            }
            this._value = simpleChange.value.currentValue;
            if (!this.lazy) {
                this.totalRecords = (this._value ? this._value.length : 0);
                if (this.sortMode == 'single' && this.sortField)
                    this.sortSingle();
                else if (this.sortMode == 'multiple' && this.multiSortMeta)
                    this.sortMultiple();
                else if (this.hasFilter()) //sort already filters
                    this._filter();
            }
            if (this.virtualScroll && this.virtualScrollCallback) {
                this.virtualScrollCallback();
            }
            this.tableService.onValueChange(simpleChange.value.currentValue);
        }
        if (simpleChange.columns) {
            this._columns = simpleChange.columns.currentValue;
            this.tableService.onColumnsChange(simpleChange.columns.currentValue);
            if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
                this.restoreColumnOrder();
            }
        }
        if (simpleChange.sortField) {
            this._sortField = simpleChange.sortField.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.sortOrder) {
            this._sortOrder = simpleChange.sortOrder.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.multiSortMeta) {
            this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
            if (this.sortMode === 'multiple') {
                this.sortMultiple();
            }
        }
        if (simpleChange.selection) {
            this._selection = simpleChange.selection.currentValue;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        }
    };
    Object.defineProperty(Table.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (cols) {
            this._columns = cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (val) {
            this._first = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (val) {
            this._rows = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.tableService.onTotalRecordsChange(this._totalRecords);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortField", {
        get: function () {
            return this._sortField;
        },
        set: function (val) {
            this._sortField = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortOrder", {
        get: function () {
            return this._sortOrder;
        },
        set: function (val) {
            this._sortOrder = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "multiSortMeta", {
        get: function () {
            return this._multiSortMeta;
        },
        set: function (val) {
            this._multiSortMeta = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "selection", {
        get: function () {
            return this._selection;
        },
        set: function (val) {
            this._selection = val;
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.updateSelectionKeys = function () {
        var e_1, _a;
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                try {
                    for (var _b = __values(this._selection), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var data = _c.value;
                        this.selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                this.selectionKeys[String(ObjectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
            }
        }
    };
    Table.prototype.onPageChange = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
        this.firstChange.emit(this.first);
        this.rowsChange.emit(this.rows);
        this.tableService.onValueChange(this.value);
        if (this.isStateful()) {
            this.saveState();
        }
        this.anchorRowIndex = null;
    };
    Table.prototype.sort = function (event) {
        var originalEvent = event.originalEvent;
        if (this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();
            if (this.resetPageOnSort) {
                this.first = 0;
                this.firstChange.emit(this.first);
            }
        }
        if (this.sortMode === 'multiple') {
            var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            var sortMeta = this.getSortMeta(event.field);
            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                }
                this._multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            this.sortMultiple();
        }
        if (this.isStateful()) {
            this.saveState();
        }
        this.anchorRowIndex = null;
    };
    Table.prototype.sortSingle = function () {
        var _this = this;
        if (this.sortField && this.sortOrder) {
            if (this.restoringSort) {
                this.restoringSort = false;
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        field: this.sortField,
                        order: this.sortOrder
                    });
                }
                else {
                    this.value.sort(function (data1, data2) {
                        var value1 = ObjectUtils.resolveFieldData(data1, _this.sortField);
                        var value2 = ObjectUtils.resolveFieldData(data2, _this.sortField);
                        var result = null;
                        if (value1 == null && value2 != null)
                            result = -1;
                        else if (value1 != null && value2 == null)
                            result = 1;
                        else if (value1 == null && value2 == null)
                            result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string')
                            result = value1.localeCompare(value2);
                        else
                            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                        return (_this.sortOrder * result);
                    });
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            var sortMeta = {
                field: this.sortField,
                order: this.sortOrder
            };
            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
        }
    };
    Table.prototype.sortMultiple = function () {
        var _this = this;
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        multiSortMeta: this.multiSortMeta
                    });
                }
                else {
                    this.value.sort(function (data1, data2) {
                        return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
                    });
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
        }
    };
    Table.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
        var value1 = ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        var value2 = ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        var result = null;
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    };
    Table.prototype.getSortMeta = function (field) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (var i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }
        return null;
    };
    Table.prototype.isSorted = function (field) {
        if (this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        }
        else if (this.sortMode === 'multiple') {
            var sorted = false;
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    };
    Table.prototype.handleRowClick = function (event) {
        var target = event.originalEvent.target;
        var targetNode = target.nodeName;
        var parentNode = target.parentElement && target.parentElement.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' ||
            parentNode == 'INPUT' || parentNode == 'BUTTON' || parentNode == 'A' ||
            (DomHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
            return;
        }
        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                DomHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }
                this.rangeRowIndex = event.rowIndex;
                this.selectRange(event.originalEvent, event.rowIndex);
            }
            else {
                var rowData = event.rowData;
                var selected = this.isSelected(rowData);
                var metaSelection = this.rowTouched ? false : this.metaKeySelection;
                var dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = event.rowIndex;
                this.rangeRowIndex = event.rowIndex;
                if (metaSelection) {
                    var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            var selectionIndex_1 = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_1; });
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }
                            this._selection = __spread(this.selection, [rowData]);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                    }
                }
                else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                        }
                        else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            var selectionIndex_2 = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_2; });
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = this.selection ? __spread(this.selection, [rowData]) : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }
            this.tableService.onSelectionChange();
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.rowTouched = false;
    };
    Table.prototype.handleRowTouchEnd = function (event) {
        this.rowTouched = true;
    };
    Table.prototype.handleRowRightClick = function (event) {
        if (this.contextMenu) {
            var rowData = event.rowData;
            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: rowData, index: event.rowIndex });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(rowData);
            }
            else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                var selected = this.isSelected(rowData);
                var dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selection = rowData;
                        this.selectionChange.emit(rowData);
                    }
                    else if (this.isMultipleSelectionMode()) {
                        this.selection = [rowData];
                        this.selectionChange.emit(this.selection);
                    }
                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }
                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event, data: rowData, index: event.rowIndex });
            }
        }
    };
    Table.prototype.selectRange = function (event, rowIndex) {
        var rangeStart, rangeEnd;
        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        }
        else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }
        if (this.lazy && this.paginator) {
            rangeStart -= this.first;
            rangeEnd -= this.first;
        }
        for (var i = rangeStart; i <= rangeEnd; i++) {
            var rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData)) {
                this._selection = __spread(this.selection, [rangeRowData]);
                var dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
                this.onRowSelect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
            }
        }
        this.selectionChange.emit(this.selection);
    };
    Table.prototype.clearSelectionRange = function (event) {
        var rangeStart, rangeEnd;
        if (this.rangeRowIndex > this.anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        else if (this.rangeRowIndex < this.anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        var _loop_1 = function (i) {
            var rangeRowData = this_1.value[i];
            var selectionIndex = this_1.findIndexInSelection(rangeRowData);
            this_1._selection = this_1.selection.filter(function (val, i) { return i != selectionIndex; });
            var dataKeyValue = this_1.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this_1.dataKey)) : null;
            if (dataKeyValue) {
                delete this_1.selectionKeys[dataKeyValue];
            }
            this_1.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        };
        var this_1 = this;
        for (var i = rangeStart; i <= rangeEnd; i++) {
            _loop_1(i);
        }
    };
    Table.prototype.isSelected = function (rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            }
            else {
                if (this.selection instanceof Array)
                    return this.findIndexInSelection(rowData) > -1;
                else
                    return this.equals(rowData, this.selection);
            }
        }
        return false;
    };
    Table.prototype.findIndexInSelection = function (rowData) {
        var index = -1;
        if (this.selection && this.selection.length) {
            for (var i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Table.prototype.toggleRowWithRadio = function (event, rowData) {
        this.preventSelectionSetterPropagation = true;
        if (this.selection != rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
        }
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
            this.saveState();
        }
    };
    Table.prototype.toggleRowWithCheckbox = function (event, rowData) {
        this.selection = this.selection || [];
        var selected = this.isSelected(rowData);
        var dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;
        if (selected) {
            var selectionIndex_3 = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_3; });
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            this._selection = this.selection ? __spread(this.selection, [rowData]) : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
            this.saveState();
        }
    };
    Table.prototype.toggleRowsWithCheckbox = function (event, check) {
        this._selection = check ? this.filteredValue ? this.filteredValue.slice() : this.value.slice() : [];
        this.preventSelectionSetterPropagation = true;
        this.updateSelectionKeys();
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
        if (this.isStateful()) {
            this.saveState();
        }
    };
    Table.prototype.equals = function (data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : ObjectUtils.equals(data1, data2, this.dataKey);
    };
    Table.prototype.filter = function (value, field, matchMode) {
        var _this = this;
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        if (!this.isFilterBlank(value)) {
            this.filters[field] = { value: value, matchMode: matchMode };
        }
        else if (this.filters[field]) {
            delete this.filters[field];
        }
        this.filterTimeout = setTimeout(function () {
            _this._filter();
            _this.filterTimeout = null;
        }, this.filterDelay);
        this.anchorRowIndex = null;
    };
    Table.prototype.filterGlobal = function (value, matchMode) {
        this.filter(value, 'global', matchMode);
    };
    Table.prototype.isFilterBlank = function (filter) {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    };
    Table.prototype._filter = function () {
        if (!this.restoringFilter) {
            this.first = 0;
            this.firstChange.emit(this.first);
        }
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }
            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            }
            else {
                var globalFilterFieldsArray = void 0;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields)
                        throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else
                        globalFilterFieldsArray = this.globalFilterFields || this.columns;
                }
                this.filteredValue = [];
                for (var i = 0; i < this.value.length; i++) {
                    var localMatch = true;
                    var globalMatch = false;
                    var localFiltered = false;
                    for (var prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            localFiltered = true;
                            var filterMeta = this.filters[prop];
                            var filterField = prop;
                            var filterValue = filterMeta.value;
                            var filterMatchMode = filterMeta.matchMode || 'startsWith';
                            var dataFieldValue = ObjectUtils.resolveFieldData(this.value[i], filterField);
                            var filterConstraint = FilterUtils[filterMatchMode];
                            if (!filterConstraint(dataFieldValue, filterValue)) {
                                localMatch = false;
                            }
                            if (!localMatch) {
                                break;
                            }
                        }
                    }
                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for (var j = 0; j < globalFilterFieldsArray.length; j++) {
                            var globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                            globalMatch = FilterUtils[this.filters['global'].matchMode](ObjectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value);
                            if (globalMatch) {
                                break;
                            }
                        }
                    }
                    var matches = void 0;
                    if (this.filters['global']) {
                        matches = localFiltered ? (localFiltered && localMatch && globalMatch) : globalMatch;
                    }
                    else {
                        matches = localFiltered && localMatch;
                    }
                    if (matches) {
                        this.filteredValue.push(this.value[i]);
                    }
                }
                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }
                if (this.paginator) {
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
            }
        }
        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });
        this.tableService.onValueChange(this.value);
        if (this.isStateful() && !this.restoringFilter) {
            this.saveState();
        }
        if (this.restoringFilter) {
            this.restoringFilter = false;
        }
        this.cd.detectChanges();
    };
    Table.prototype.hasFilter = function () {
        var empty = true;
        for (var prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    };
    Table.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.virtualScroll ? this.rows * 2 : this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta
        };
    };
    Table.prototype.reset = function () {
        this._sortField = null;
        this._sortOrder = this.defaultSortOrder;
        this._multiSortMeta = null;
        this.tableService.onSort(null);
        this.filteredValue = null;
        this.filters = {};
        this.first = 0;
        this.firstChange.emit(this.first);
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = (this._value ? this._value.length : 0);
        }
    };
    Table.prototype.exportCSV = function (options) {
        var _this = this;
        var data = this.filteredValue || this.value;
        var csv = '';
        if (options && options.selectionOnly) {
            data = this.selection || [];
        }
        //headers
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            if (column.exportable !== false && column.field) {
                csv += '"' + (column.header || column.field) + '"';
                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        //body
        data.forEach(function (record, i) {
            csv += '\n';
            for (var i_1 = 0; i_1 < _this.columns.length; i_1++) {
                var column = _this.columns[i_1];
                if (column.exportable !== false && column.field) {
                    var cellData = ObjectUtils.resolveFieldData(record, column.field);
                    if (cellData != null) {
                        if (_this.exportFunction) {
                            cellData = _this.exportFunction({
                                data: cellData,
                                field: column.field
                            });
                        }
                        else
                            cellData = String(cellData).replace(/"/g, '""');
                    }
                    else
                        cellData = '';
                    csv += '"' + cellData + '"';
                    if (i_1 < (_this.columns.length - 1)) {
                        csv += _this.csvSeparator;
                    }
                }
            }
        });
        var blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        }
        else {
            var link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    };
    Table.prototype.updateEditingCell = function (cell, data, field) {
        this.editingCell = cell;
        this.editingCellData = data;
        this.editingCellField = field;
        this.bindDocumentEditListener();
    };
    Table.prototype.isEditingCellValid = function () {
        return (this.editingCell && DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0);
    };
    Table.prototype.bindDocumentEditListener = function () {
        var _this = this;
        if (!this.documentEditListener) {
            this.documentEditListener = function (event) {
                if (_this.editingCell && !_this.editingCellClick && _this.isEditingCellValid()) {
                    DomHandler.removeClass(_this.editingCell, 'ui-editing-cell');
                    _this.editingCell = null;
                    _this.onEditComplete.emit({ field: _this.editingCellField, data: _this.editingCellData, originalEvent: event });
                    _this.editingCellField = null;
                    _this.editingCellData = null;
                    _this.unbindDocumentEditListener();
                }
                _this.editingCellClick = false;
            };
            document.addEventListener('click', this.documentEditListener);
        }
    };
    Table.prototype.unbindDocumentEditListener = function () {
        if (this.documentEditListener) {
            document.removeEventListener('click', this.documentEditListener);
            this.documentEditListener = null;
        }
    };
    Table.prototype.initRowEdit = function (rowData) {
        var dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        this.editingRowKeys[dataKeyValue] = true;
    };
    Table.prototype.saveRowEdit = function (rowData, rowElement) {
        if (DomHandler.find(rowElement, '.ng-invalid.ng-dirty').length === 0) {
            var dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
            delete this.editingRowKeys[dataKeyValue];
        }
    };
    Table.prototype.cancelRowEdit = function (rowData) {
        var dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        delete this.editingRowKeys[dataKeyValue];
    };
    Table.prototype.toggleRow = function (rowData, event) {
        if (!this.dataKey) {
            throw new Error('dataKey must be defined to use row expansion');
        }
        var dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: event,
                data: rowData
            });
        }
        else {
            if (this.rowExpandMode === 'single') {
                this.expandedRowKeys = {};
            }
            this.expandedRowKeys[dataKeyValue] = true;
            this.onRowExpand.emit({
                originalEvent: event,
                data: rowData
            });
        }
        if (event) {
            event.preventDefault();
        }
        if (this.isStateful()) {
            this.saveState();
        }
    };
    Table.prototype.isRowExpanded = function (rowData) {
        return this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    };
    Table.prototype.isRowEditing = function (rowData) {
        return this.editingRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    };
    Table.prototype.isSingleSelectionMode = function () {
        return this.selectionMode === 'single';
    };
    Table.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode === 'multiple';
    };
    Table.prototype.onColumnResizeBegin = function (event) {
        var containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
        event.preventDefault();
    };
    Table.prototype.onColumnResize = function (event) {
        var containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
        DomHandler.addClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';
        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    };
    Table.prototype.onColumnResizeEnd = function (event, column) {
        var delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        var columnWidth = column.offsetWidth;
        var minWidth = parseInt(column.style.minWidth || 15);
        if (columnWidth + delta < minWidth) {
            delta = minWidth - columnWidth;
        }
        var newColumnWidth = columnWidth + delta;
        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                var nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }
                if (nextColumn) {
                    var nextColumnWidth = nextColumn.offsetWidth - delta;
                    var nextColumnMinWidth = nextColumn.style.minWidth || 15;
                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        if (this.scrollable) {
                            var scrollableView = this.findParentScrollableView(column);
                            var scrollableBodyTable = DomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
                            var scrollableHeaderTable = DomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-header-table');
                            var scrollableFooterTable = DomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-footer-table');
                            var resizeColumnIndex = DomHandler.index(column);
                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        }
                        else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                if (newColumnWidth > minWidth) {
                    if (this.scrollable) {
                        this.setScrollableItemsWidthOnExpandResize(column, newColumnWidth, delta);
                    }
                    else {
                        this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                        column.style.width = newColumnWidth + 'px';
                        var containerWidth = this.tableViewChild.nativeElement.style.width;
                        this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                    }
                }
            }
            this.onColResize.emit({
                element: column,
                delta: delta
            });
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        DomHandler.removeClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
    };
    Table.prototype.setScrollableItemsWidthOnExpandResize = function (column, newColumnWidth, delta) {
        var scrollableView = column ? this.findParentScrollableView(column) : this.containerViewChild.nativeElement;
        var scrollableBody = DomHandler.findSingle(scrollableView, '.ui-table-scrollable-body');
        var scrollableHeader = DomHandler.findSingle(scrollableView, '.ui-table-scrollable-header');
        var scrollableFooter = DomHandler.findSingle(scrollableView, '.ui-table-scrollable-footer');
        var scrollableBodyTable = DomHandler.findSingle(scrollableBody, 'table.ui-table-scrollable-body-table');
        var scrollableHeaderTable = DomHandler.findSingle(scrollableHeader, 'table.ui-table-scrollable-header-table');
        var scrollableFooterTable = DomHandler.findSingle(scrollableFooter, 'table.ui-table-scrollable-footer-table');
        var scrollableBodyTableWidth = column ? scrollableBodyTable.offsetWidth + delta : newColumnWidth;
        var scrollableHeaderTableWidth = column ? scrollableHeaderTable.offsetWidth + delta : newColumnWidth;
        var isContainerInViewport = this.containerViewChild.nativeElement.offsetWidth >= scrollableBodyTableWidth;
        var setWidth = function (container, table, width, isContainerInViewport) {
            if (container && table) {
                container.style.width = isContainerInViewport ? width + DomHandler.calculateScrollbarWidth(scrollableBody) + 'px' : 'auto';
                table.style.width = width + 'px';
            }
        };
        setWidth(scrollableBody, scrollableBodyTable, scrollableBodyTableWidth, isContainerInViewport);
        setWidth(scrollableHeader, scrollableHeaderTable, scrollableHeaderTableWidth, isContainerInViewport);
        setWidth(scrollableFooter, scrollableFooterTable, scrollableHeaderTableWidth, isContainerInViewport);
        if (column) {
            var resizeColumnIndex = DomHandler.index(column);
            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
        }
    };
    Table.prototype.findParentScrollableView = function (column) {
        if (column) {
            var parent_1 = column.parentElement;
            while (parent_1 && !DomHandler.hasClass(parent_1, 'ui-table-scrollable-view')) {
                parent_1 = parent_1.parentElement;
            }
            return parent_1;
        }
        else {
            return null;
        }
    };
    Table.prototype.resizeColGroup = function (table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
            var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
            if (colGroup) {
                var col = colGroup.children[resizeColumnIndex];
                var nextCol = col.nextElementSibling;
                col.style.width = newColumnWidth + 'px';
                if (nextCol && nextColumnWidth) {
                    nextCol.style.width = nextColumnWidth + 'px';
                }
            }
            else {
                throw "Scrollable tables require a colgroup to support resizable columns";
            }
        }
    };
    Table.prototype.onColumnDragStart = function (event, columnElement) {
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    };
    Table.prototype.onColumnDragEnter = function (event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            var containerOffset = DomHandler.getOffset(this.containerViewChild.nativeElement);
            var dropHeaderOffset = DomHandler.getOffset(dropHeader);
            if (this.draggedColumn != dropHeader) {
                var dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                var dropIndex = DomHandler.indexWithinGroup(dropHeader, 'preorderablecolumn');
                var targetLeft = dropHeaderOffset.left - containerOffset.left;
                var targetTop = containerOffset.top - dropHeaderOffset.top;
                var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }
                if ((dropIndex - dragIndex === 1 && this.dropPosition === -1) || (dropIndex - dragIndex === -1 && this.dropPosition === 1)) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                    this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                    this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
                }
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    };
    Table.prototype.onColumnDragLeave = function (event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
        }
    };
    Table.prototype.onColumnDrop = function (event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            var dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            var dropIndex = DomHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            var allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop && ((dropIndex < dragIndex && this.dropPosition === 1))) {
                dropIndex = dropIndex + 1;
            }
            if (allowDrop && ((dropIndex > dragIndex && this.dropPosition === -1))) {
                dropIndex = dropIndex - 1;
            }
            if (allowDrop) {
                ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
                if (this.isStateful()) {
                    this.saveState();
                }
            }
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    };
    Table.prototype.onRowDragStart = function (event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
    };
    Table.prototype.onRowDragOver = function (event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            var rowY = DomHandler.getOffset(rowElement).top + DomHandler.getWindowScrollTop();
            var pageY = event.pageY;
            var rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
            var prevRowElement = rowElement.previousElementSibling;
            if (pageY < rowMidY) {
                DomHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
                this.droppedRowIndex = index;
                if (prevRowElement)
                    DomHandler.addClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'ui-table-dragpoint-top');
            }
            else {
                if (prevRowElement)
                    DomHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'ui-table-dragpoint-top');
                this.droppedRowIndex = index + 1;
                DomHandler.addClass(rowElement, 'ui-table-dragpoint-bottom');
            }
        }
    };
    Table.prototype.onRowDragLeave = function (event, rowElement) {
        var prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            DomHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
        }
        DomHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
        DomHandler.removeClass(rowElement, 'ui-table-dragpoint-top');
    };
    Table.prototype.onRowDragEnd = function (event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    };
    Table.prototype.onRowDrop = function (event, rowElement) {
        if (this.droppedRowIndex != null) {
            var dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
            ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: dropIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    };
    Table.prototype.handleVirtualScroll = function (event) {
        var _this = this;
        this.first = (event.page - 1) * this.rows;
        this.firstChange.emit(this.first);
        this.virtualScrollCallback = event.callback;
        this.zone.run(function () {
            if (_this.virtualScrollTimer) {
                clearTimeout(_this.virtualScrollTimer);
            }
            _this.virtualScrollTimer = setTimeout(function () {
                _this.onLazyLoad.emit(_this.createLazyLoadMetadata());
            }, _this.virtualScrollDelay);
        });
    };
    Table.prototype.isEmpty = function () {
        var data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    };
    Table.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Table.prototype.getStorage = function () {
        switch (this.stateStorage) {
            case 'local':
                return window.localStorage;
            case 'session':
                return window.sessionStorage;
            default:
                throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
        }
    };
    Table.prototype.isStateful = function () {
        return this.stateKey != null;
    };
    Table.prototype.saveState = function () {
        var storage = this.getStorage();
        var state = {};
        if (this.paginator) {
            state.first = this.first;
            state.rows = this.rows;
        }
        if (this.sortField) {
            state.sortField = this.sortField;
            state.sortOrder = this.sortOrder;
        }
        if (this.multiSortMeta) {
            state.multiSortMeta = this.multiSortMeta;
        }
        if (this.hasFilter()) {
            state.filters = this.filters;
        }
        if (this.resizableColumns) {
            this.saveColumnWidths(state);
        }
        if (this.reorderableColumns) {
            this.saveColumnOrder(state);
        }
        if (this.selection) {
            state.selection = this.selection;
        }
        if (Object.keys(this.expandedRowKeys).length) {
            state.expandedRowKeys = this.expandedRowKeys;
        }
        if (Object.keys(state).length) {
            storage.setItem(this.stateKey, JSON.stringify(state));
        }
        this.onStateSave.emit(state);
    };
    Table.prototype.clearState = function () {
        var storage = this.getStorage();
        if (this.stateKey) {
            storage.removeItem(this.stateKey);
        }
    };
    Table.prototype.restoreState = function () {
        var _this = this;
        var storage = this.getStorage();
        var stateString = storage.getItem(this.stateKey);
        if (stateString) {
            var state_1 = JSON.parse(stateString);
            if (this.paginator) {
                this.first = state_1.first;
                this.rows = state_1.rows;
                this.firstChange.emit(this.first);
                this.rowsChange.emit(this.rows);
            }
            if (state_1.sortField) {
                this.restoringSort = true;
                this._sortField = state_1.sortField;
                this._sortOrder = state_1.sortOrder;
            }
            if (state_1.multiSortMeta) {
                this.restoringSort = true;
                this._multiSortMeta = state_1.multiSortMeta;
            }
            if (state_1.filters) {
                this.restoringFilter = true;
                this.filters = state_1.filters;
            }
            if (this.resizableColumns) {
                this.columnWidthsState = state_1.columnWidths;
                this.tableWidthState = state_1.tableWidth;
            }
            if (state_1.expandedRowKeys) {
                this.expandedRowKeys = state_1.expandedRowKeys;
            }
            if (state_1.selection) {
                Promise.resolve(null).then(function () { return _this.selectionChange.emit(state_1.selection); });
            }
            this.stateRestored = true;
            this.onStateRestore.emit(state_1);
        }
    };
    Table.prototype.saveColumnWidths = function (state) {
        var widths = [];
        var headers = DomHandler.find(this.containerViewChild.nativeElement, '.ui-table-thead > tr:first-child > th');
        headers.map(function (header) { return widths.push(DomHandler.getOuterWidth(header)); });
        state.columnWidths = widths.join(',');
        if (this.columnResizeMode === 'expand') {
            state.tableWidth = this.scrollable ? DomHandler.findSingle(this.containerViewChild.nativeElement, '.ui-table-scrollable-header-table').style.width :
                DomHandler.getOuterWidth(this.tableViewChild.nativeElement) + 'px';
        }
    };
    Table.prototype.restoreColumnWidths = function () {
        if (this.columnWidthsState) {
            var widths_1 = this.columnWidthsState.split(',');
            if (this.columnResizeMode === 'expand' && this.tableWidthState) {
                if (this.scrollable) {
                    this.setScrollableItemsWidthOnExpandResize(null, this.tableWidthState, 0);
                }
                else {
                    this.tableViewChild.nativeElement.style.width = this.tableWidthState;
                    this.containerViewChild.nativeElement.style.width = this.tableWidthState;
                }
            }
            if (this.scrollable) {
                var headerCols = DomHandler.find(this.containerViewChild.nativeElement, '.ui-table-scrollable-header-table > colgroup > col');
                var bodyCols = DomHandler.find(this.containerViewChild.nativeElement, '.ui-table-scrollable-body-table > colgroup > col');
                headerCols.map(function (col, index) { return col.style.width = widths_1[index] + 'px'; });
                bodyCols.map(function (col, index) { return col.style.width = widths_1[index] + 'px'; });
            }
            else {
                var headers = DomHandler.find(this.tableViewChild.nativeElement, '.ui-table-thead > tr:first-child > th');
                headers.map(function (header, index) { return header.style.width = widths_1[index] + 'px'; });
            }
        }
    };
    Table.prototype.saveColumnOrder = function (state) {
        if (this.columns) {
            var columnOrder_1 = [];
            this.columns.map(function (column) {
                columnOrder_1.push(column.field || column.key);
            });
            state.columnOrder = columnOrder_1;
        }
    };
    Table.prototype.restoreColumnOrder = function () {
        var _this = this;
        var storage = this.getStorage();
        var stateString = storage.getItem(this.stateKey);
        if (stateString) {
            var state = JSON.parse(stateString);
            var columnOrder = state.columnOrder;
            if (columnOrder) {
                var reorderedColumns_1 = [];
                columnOrder.map(function (key) { return reorderedColumns_1.push(_this.findColumnByKey(key)); });
                this.columnOrderStateRestored = true;
                this.columns = reorderedColumns_1;
            }
        }
    };
    Table.prototype.findColumnByKey = function (key) {
        var e_2, _a;
        if (this.columns) {
            try {
                for (var _b = __values(this.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var col = _c.value;
                    if (col.key === key || col.field === key)
                        return col;
                    else
                        continue;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            return null;
        }
    };
    Table.prototype.ngOnDestroy = function () {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.initialized = null;
    };
    Table.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: TableService },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Table.prototype, "frozenColumns", void 0);
    __decorate([
        Input()
    ], Table.prototype, "frozenValue", void 0);
    __decorate([
        Input()
    ], Table.prototype, "style", void 0);
    __decorate([
        Input()
    ], Table.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Table.prototype, "tableStyle", void 0);
    __decorate([
        Input()
    ], Table.prototype, "tableStyleClass", void 0);
    __decorate([
        Input()
    ], Table.prototype, "paginator", void 0);
    __decorate([
        Input()
    ], Table.prototype, "pageLinks", void 0);
    __decorate([
        Input()
    ], Table.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        Input()
    ], Table.prototype, "alwaysShowPaginator", void 0);
    __decorate([
        Input()
    ], Table.prototype, "paginatorPosition", void 0);
    __decorate([
        Input()
    ], Table.prototype, "paginatorDropdownAppendTo", void 0);
    __decorate([
        Input()
    ], Table.prototype, "paginatorDropdownScrollHeight", void 0);
    __decorate([
        Input()
    ], Table.prototype, "currentPageReportTemplate", void 0);
    __decorate([
        Input()
    ], Table.prototype, "showCurrentPageReport", void 0);
    __decorate([
        Input()
    ], Table.prototype, "defaultSortOrder", void 0);
    __decorate([
        Input()
    ], Table.prototype, "sortMode", void 0);
    __decorate([
        Input()
    ], Table.prototype, "resetPageOnSort", void 0);
    __decorate([
        Input()
    ], Table.prototype, "selectionMode", void 0);
    __decorate([
        Output()
    ], Table.prototype, "selectionChange", void 0);
    __decorate([
        Input()
    ], Table.prototype, "contextMenuSelection", void 0);
    __decorate([
        Output()
    ], Table.prototype, "contextMenuSelectionChange", void 0);
    __decorate([
        Input()
    ], Table.prototype, "contextMenuSelectionMode", void 0);
    __decorate([
        Input()
    ], Table.prototype, "dataKey", void 0);
    __decorate([
        Input()
    ], Table.prototype, "metaKeySelection", void 0);
    __decorate([
        Input()
    ], Table.prototype, "rowTrackBy", void 0);
    __decorate([
        Input()
    ], Table.prototype, "lazy", void 0);
    __decorate([
        Input()
    ], Table.prototype, "lazyLoadOnInit", void 0);
    __decorate([
        Input()
    ], Table.prototype, "compareSelectionBy", void 0);
    __decorate([
        Input()
    ], Table.prototype, "csvSeparator", void 0);
    __decorate([
        Input()
    ], Table.prototype, "exportFilename", void 0);
    __decorate([
        Input()
    ], Table.prototype, "filters", void 0);
    __decorate([
        Input()
    ], Table.prototype, "globalFilterFields", void 0);
    __decorate([
        Input()
    ], Table.prototype, "filterDelay", void 0);
    __decorate([
        Input()
    ], Table.prototype, "expandedRowKeys", void 0);
    __decorate([
        Input()
    ], Table.prototype, "editingRowKeys", void 0);
    __decorate([
        Input()
    ], Table.prototype, "rowExpandMode", void 0);
    __decorate([
        Input()
    ], Table.prototype, "scrollable", void 0);
    __decorate([
        Input()
    ], Table.prototype, "scrollHeight", void 0);
    __decorate([
        Input()
    ], Table.prototype, "virtualScroll", void 0);
    __decorate([
        Input()
    ], Table.prototype, "virtualScrollDelay", void 0);
    __decorate([
        Input()
    ], Table.prototype, "virtualRowHeight", void 0);
    __decorate([
        Input()
    ], Table.prototype, "frozenWidth", void 0);
    __decorate([
        Input()
    ], Table.prototype, "responsive", void 0);
    __decorate([
        Input()
    ], Table.prototype, "contextMenu", void 0);
    __decorate([
        Input()
    ], Table.prototype, "resizableColumns", void 0);
    __decorate([
        Input()
    ], Table.prototype, "columnResizeMode", void 0);
    __decorate([
        Input()
    ], Table.prototype, "reorderableColumns", void 0);
    __decorate([
        Input()
    ], Table.prototype, "loading", void 0);
    __decorate([
        Input()
    ], Table.prototype, "loadingIcon", void 0);
    __decorate([
        Input()
    ], Table.prototype, "showLoader", void 0);
    __decorate([
        Input()
    ], Table.prototype, "rowHover", void 0);
    __decorate([
        Input()
    ], Table.prototype, "customSort", void 0);
    __decorate([
        Input()
    ], Table.prototype, "autoLayout", void 0);
    __decorate([
        Input()
    ], Table.prototype, "exportFunction", void 0);
    __decorate([
        Input()
    ], Table.prototype, "stateKey", void 0);
    __decorate([
        Input()
    ], Table.prototype, "stateStorage", void 0);
    __decorate([
        Input()
    ], Table.prototype, "editMode", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onRowSelect", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onRowUnselect", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onPage", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onSort", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onFilter", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onLazyLoad", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onRowExpand", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onRowCollapse", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onContextMenuSelect", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onColResize", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onColReorder", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onRowReorder", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onEditInit", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onEditComplete", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onEditCancel", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onHeaderCheckboxToggle", void 0);
    __decorate([
        Output()
    ], Table.prototype, "sortFunction", void 0);
    __decorate([
        Output()
    ], Table.prototype, "firstChange", void 0);
    __decorate([
        Output()
    ], Table.prototype, "rowsChange", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onStateSave", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onStateRestore", void 0);
    __decorate([
        ViewChild('container', { static: false })
    ], Table.prototype, "containerViewChild", void 0);
    __decorate([
        ViewChild('resizeHelper', { static: false })
    ], Table.prototype, "resizeHelperViewChild", void 0);
    __decorate([
        ViewChild('reorderIndicatorUp', { static: false })
    ], Table.prototype, "reorderIndicatorUpViewChild", void 0);
    __decorate([
        ViewChild('reorderIndicatorDown', { static: false })
    ], Table.prototype, "reorderIndicatorDownViewChild", void 0);
    __decorate([
        ViewChild('table', { static: false })
    ], Table.prototype, "tableViewChild", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Table.prototype, "templates", void 0);
    __decorate([
        Input()
    ], Table.prototype, "value", null);
    __decorate([
        Input()
    ], Table.prototype, "columns", null);
    __decorate([
        Input()
    ], Table.prototype, "first", null);
    __decorate([
        Input()
    ], Table.prototype, "rows", null);
    __decorate([
        Input()
    ], Table.prototype, "totalRecords", null);
    __decorate([
        Input()
    ], Table.prototype, "sortField", null);
    __decorate([
        Input()
    ], Table.prototype, "sortOrder", null);
    __decorate([
        Input()
    ], Table.prototype, "multiSortMeta", null);
    __decorate([
        Input()
    ], Table.prototype, "selection", null);
    Table = __decorate([
        Component({
            selector: 'p-table',
            template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\"\n            [ngClass]=\"{'ui-table ui-widget': true, 'ui-table-responsive': responsive, 'ui-table-resizable': resizableColumns,\n                'ui-table-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),\n                'ui-table-hoverable-rows': (rowHover||selectionMode), 'ui-table-auto-layout': autoLayout}\">\n            <div class=\"ui-table-loading ui-widget-overlay\" *ngIf=\"loading && showLoader\"></div>\n            <div class=\"ui-table-loading-content\" *ngIf=\"loading && showLoader\">\n                <i [class]=\"'ui-table-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div *ngIf=\"captionTemplate\" class=\"ui-table-caption ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"captionTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-top\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\"></p-paginator>\n            \n            <div class=\"ui-table-wrapper\" *ngIf=\"!scrollable\">\n                <table #table [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-table-thead\">\n                        <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"ui-table-tbody\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                    <tfoot *ngIf=\"footerTemplate\" class=\"ui-table-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n\n            <div class=\"ui-table-scrollable-wrapper\" *ngIf=\"scrollable\">\n               <div class=\"ui-table-scrollable-view ui-table-frozen-view\" *ngIf=\"frozenColumns||frozenBodyTemplate\" [pScrollableView]=\"frozenColumns\" [frozen]=\"true\" [ngStyle]=\"{width: frozenWidth}\" [scrollHeight]=\"scrollHeight\"></div>\n               <div class=\"ui-table-scrollable-view\" [pScrollableView]=\"columns\" [frozen]=\"false\" [scrollHeight]=\"scrollHeight\" [ngStyle]=\"{left: frozenWidth, width: 'calc(100% - '+frozenWidth+')'}\"></div>\n            </div>\n            \n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\"></p-paginator>\n            \n                <div *ngIf=\"summaryTemplate\" class=\"ui-table-summary ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"summaryTemplate\"></ng-container>\n            </div>\n\n            <div #resizeHelper class=\"ui-column-resizer-helper ui-state-highlight\" style=\"display:none\" *ngIf=\"resizableColumns\"></div>\n\n            <span #reorderIndicatorUp class=\"pi pi-arrow-down ui-table-reorder-indicator-up\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n            <span #reorderIndicatorDown class=\"pi pi-arrow-up ui-table-reorder-indicator-down\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n        </div>\n    ",
            providers: [TableService]
        })
    ], Table);
    return Table;
}());
export { Table };
var TableBody = /** @class */ (function () {
    function TableBody(dt) {
        this.dt = dt;
    }
    TableBody.ctorParameters = function () { return [
        { type: Table }
    ]; };
    __decorate([
        Input("pTableBody")
    ], TableBody.prototype, "columns", void 0);
    __decorate([
        Input("pTableBodyTemplate")
    ], TableBody.prototype, "template", void 0);
    __decorate([
        Input()
    ], TableBody.prototype, "frozen", void 0);
    TableBody = __decorate([
        Component({
            selector: '[pTableBody]',
            template: "\n        <ng-container *ngIf=\"!dt.expandedRowTemplate\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}\"></ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.expandedRowTemplate\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}\"></ng-container>\n                <ng-container *ngIf=\"dt.isRowExpanded(rowData)\">\n                    <ng-container *ngTemplateOutlet=\"dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.isEmpty()\">\n            <ng-container *ngTemplateOutlet=\"dt.emptyMessageTemplate; context: {$implicit: columns, frozen: frozen}\"></ng-container>\n        </ng-container>\n    "
        })
    ], TableBody);
    return TableBody;
}());
export { TableBody };
var ScrollableView = /** @class */ (function () {
    function ScrollableView(dt, el, zone) {
        var _this = this;
        this.dt = dt;
        this.el = el;
        this.zone = zone;
        this.loadingArray = [];
        this.subscription = this.dt.tableService.valueSource$.subscribe(function () {
            _this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.alignScrollBar();
                    if (_this.scrollLoadingTableViewChild && _this.scrollLoadingTableViewChild.nativeElement) {
                        _this.scrollLoadingTableViewChild.nativeElement.style.display = 'none';
                    }
                }, 50);
            });
        });
        if (this.dt.virtualScroll) {
            this.totalRecordsSubscription = this.dt.tableService.totalRecordsSource$.subscribe(function () {
                _this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.setVirtualScrollerHeight();
                    }, 50);
                });
            });
        }
        this.loadingArray = Array(this.dt.rows).fill(1);
        this.initialized = false;
    }
    Object.defineProperty(ScrollableView.prototype, "scrollHeight", {
        get: function () {
            return this._scrollHeight;
        },
        set: function (val) {
            this._scrollHeight = val;
            this.setScrollHeight();
        },
        enumerable: true,
        configurable: true
    });
    ScrollableView.prototype.ngAfterViewChecked = function () {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.alignScrollBar();
            this.setScrollHeight();
            this.initialized = true;
        }
    };
    ScrollableView.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.frozen) {
            if (this.dt.frozenColumns || this.dt.frozenBodyTemplate) {
                DomHandler.addClass(this.el.nativeElement, 'ui-table-unfrozen-view');
            }
            var frozenView = this.el.nativeElement.previousElementSibling;
            if (frozenView) {
                this.frozenSiblingBody = DomHandler.findSingle(frozenView, '.ui-table-scrollable-body');
            }
        }
        else {
            this.scrollBodyViewChild.nativeElement.style.paddingBottom = DomHandler.calculateScrollbarWidth() + 'px';
            var scrollableView = this.el.nativeElement.nextElementSibling;
            if (scrollableView) {
                this.scrollableSiblingBody = DomHandler.findSingle(scrollableView, '.ui-table-scrollable-body');
            }
        }
        this.bindEvents();
        this.setScrollHeight();
        this.alignScrollBar();
        if (this.frozen) {
            this.columnsSubscription = this.dt.tableService.columnsSource$.subscribe(function () {
                _this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.setScrollHeight();
                    }, 50);
                });
            });
        }
        if (this.dt.virtualScroll) {
            this.setVirtualScrollerHeight();
            if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
                this.scrollLoadingTableViewChild.nativeElement.style.display = 'table';
            }
        }
    };
    ScrollableView.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            var scrollBarWidth = DomHandler.calculateScrollbarWidth();
            if (_this.scrollHeaderViewChild && _this.scrollHeaderViewChild.nativeElement) {
                _this.headerScrollListener = _this.onHeaderScroll.bind(_this);
                _this.scrollHeaderViewChild.nativeElement.addEventListener('scroll', _this.headerScrollListener);
            }
            if (_this.scrollFooterViewChild && _this.scrollFooterViewChild.nativeElement) {
                _this.footerScrollListener = _this.onFooterScroll.bind(_this);
                _this.scrollFooterViewChild.nativeElement.addEventListener('scroll', _this.footerScrollListener);
            }
            if (!_this.frozen) {
                _this.bodyScrollListener = _this.onBodyScroll.bind(_this);
                _this.scrollBodyViewChild.nativeElement.addEventListener('scroll', _this.bodyScrollListener);
            }
        });
    };
    ScrollableView.prototype.unbindEvents = function () {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
        }
        this.scrollBodyViewChild.nativeElement.removeEventListener('scroll', this.bodyScrollListener);
    };
    ScrollableView.prototype.onHeaderScroll = function (event) {
        var scrollLeft = this.scrollHeaderViewChild.nativeElement.scrollLeft;
        this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.scrollLeft = scrollLeft;
        }
        this.preventBodyScrollPropagation = true;
    };
    ScrollableView.prototype.onFooterScroll = function (event) {
        var scrollLeft = this.scrollFooterViewChild.nativeElement.scrollLeft;
        this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderViewChild.nativeElement.scrollLeft = scrollLeft;
        }
        this.preventBodyScrollPropagation = true;
    };
    ScrollableView.prototype.onBodyScroll = function (event) {
        var _this = this;
        if (this.preventBodyScrollPropagation) {
            this.preventBodyScrollPropagation = false;
            return;
        }
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
        }
        if (this.dt.virtualScroll) {
            var viewport = DomHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
            var tableHeight = DomHandler.getOuterHeight(this.scrollTableViewChild.nativeElement);
            var pageHeight_1 = this.dt.virtualRowHeight * this.dt.rows;
            var virtualTableHeight = DomHandler.getOuterHeight(this.virtualScrollerViewChild.nativeElement);
            var pageCount = (virtualTableHeight / pageHeight_1) || 1;
            var scrollBodyTop = this.scrollTableViewChild.nativeElement.style.top || '0';
            if ((this.scrollBodyViewChild.nativeElement.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight) || (this.scrollBodyViewChild.nativeElement.scrollTop < parseFloat(scrollBodyTop))) {
                if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
                    this.scrollLoadingTableViewChild.nativeElement.style.display = 'table';
                    this.scrollLoadingTableViewChild.nativeElement.style.top = this.scrollBodyViewChild.nativeElement.scrollTop + 'px';
                }
                var page_1 = Math.floor((this.scrollBodyViewChild.nativeElement.scrollTop * pageCount) / (this.scrollBodyViewChild.nativeElement.scrollHeight)) + 1;
                this.dt.handleVirtualScroll({
                    page: page_1,
                    callback: function () {
                        if (_this.scrollLoadingTableViewChild && _this.scrollLoadingTableViewChild.nativeElement) {
                            _this.scrollLoadingTableViewChild.nativeElement.style.display = 'none';
                        }
                        _this.scrollTableViewChild.nativeElement.style.top = ((page_1 - 1) * pageHeight_1) + 'px';
                        if (_this.frozenSiblingBody) {
                            _this.frozenSiblingBody.children[0].style.top = _this.scrollTableViewChild.nativeElement.style.top;
                        }
                        _this.dt.anchorRowIndex = null;
                    }
                });
            }
        }
    };
    ScrollableView.prototype.setScrollHeight = function () {
        if (this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            if (this.scrollHeight.indexOf('%') !== -1) {
                var relativeHeight = void 0;
                this.scrollBodyViewChild.nativeElement.style.visibility = 'hidden';
                this.scrollBodyViewChild.nativeElement.style.height = '100px'; //temporary height to calculate static height
                var containerHeight = DomHandler.getOuterHeight(this.dt.el.nativeElement.children[0]);
                if (this.scrollHeight.includes("calc")) {
                    var percentHeight = parseInt(this.scrollHeight.slice(this.scrollHeight.indexOf("(") + 1, this.scrollHeight.indexOf("%")));
                    var diffValue = parseInt(this.scrollHeight.slice(this.scrollHeight.indexOf("-") + 1, this.scrollHeight.indexOf(")")));
                    relativeHeight = (DomHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * percentHeight / 100) - diffValue;
                }
                else {
                    relativeHeight = DomHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * parseInt(this.scrollHeight) / 100;
                }
                var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
                var scrollBodyHeight = (relativeHeight - staticHeight);
                if (this.frozen) {
                    scrollBodyHeight -= DomHandler.calculateScrollbarWidth();
                }
                this.scrollBodyViewChild.nativeElement.style.height = 'auto';
                this.scrollBodyViewChild.nativeElement.style.maxHeight = scrollBodyHeight + 'px';
                this.scrollBodyViewChild.nativeElement.style.visibility = 'visible';
            }
            else {
                if (this.frozen && this.scrollableSiblingBody && DomHandler.getOuterWidth(this.scrollableSiblingBody) < DomHandler.getOuterWidth(this.scrollableSiblingBody.children[0]))
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = (parseInt(this.scrollHeight) - DomHandler.calculateScrollbarWidth()) + 'px';
                else
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = this.scrollHeight;
            }
        }
    };
    ScrollableView.prototype.setVirtualScrollerHeight = function () {
        if (this.virtualScrollerViewChild.nativeElement) {
            this.virtualScrollerViewChild.nativeElement.style.height = this.dt.totalRecords * this.dt.virtualRowHeight + 'px';
        }
    };
    ScrollableView.prototype.hasVerticalOverflow = function () {
        return DomHandler.getOuterHeight(this.scrollTableViewChild.nativeElement) > DomHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
    };
    ScrollableView.prototype.alignScrollBar = function () {
        if (!this.frozen) {
            var scrollBarWidth = this.hasVerticalOverflow() ? DomHandler.calculateScrollbarWidth() : 0;
            this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            }
        }
        this.initialized = false;
    };
    ScrollableView.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        this.frozenSiblingBody = null;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.totalRecordsSubscription) {
            this.totalRecordsSubscription.unsubscribe();
        }
        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
        this.initialized = false;
    };
    ScrollableView.ctorParameters = function () { return [
        { type: Table },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input("pScrollableView")
    ], ScrollableView.prototype, "columns", void 0);
    __decorate([
        Input()
    ], ScrollableView.prototype, "frozen", void 0);
    __decorate([
        ViewChild('scrollHeader', { static: true })
    ], ScrollableView.prototype, "scrollHeaderViewChild", void 0);
    __decorate([
        ViewChild('scrollHeaderBox', { static: true })
    ], ScrollableView.prototype, "scrollHeaderBoxViewChild", void 0);
    __decorate([
        ViewChild('scrollBody', { static: true })
    ], ScrollableView.prototype, "scrollBodyViewChild", void 0);
    __decorate([
        ViewChild('scrollTable', { static: true })
    ], ScrollableView.prototype, "scrollTableViewChild", void 0);
    __decorate([
        ViewChild('loadingTable', { static: false })
    ], ScrollableView.prototype, "scrollLoadingTableViewChild", void 0);
    __decorate([
        ViewChild('scrollFooter', { static: true })
    ], ScrollableView.prototype, "scrollFooterViewChild", void 0);
    __decorate([
        ViewChild('scrollFooterBox', { static: true })
    ], ScrollableView.prototype, "scrollFooterBoxViewChild", void 0);
    __decorate([
        ViewChild('virtualScroller', { static: false })
    ], ScrollableView.prototype, "virtualScrollerViewChild", void 0);
    __decorate([
        Input()
    ], ScrollableView.prototype, "scrollHeight", null);
    ScrollableView = __decorate([
        Component({
            selector: '[pScrollableView]',
            template: "\n        <div #scrollHeader class=\"ui-table-scrollable-header ui-widget-header\">\n            <div #scrollHeaderBox class=\"ui-table-scrollable-header-box\">\n                <table class=\"ui-table-scrollable-header-table\" [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-table-thead\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenHeaderTemplate||dt.headerTemplate : dt.headerTemplate; context {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"ui-table-tbody\">\n                        <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"dt.frozenValue\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                            <ng-container *ngTemplateOutlet=\"dt.frozenRowsTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}\"></ng-container>\n                        </ng-template>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <div #scrollBody class=\"ui-table-scrollable-body\">\n            <table #scrollTable [ngClass]=\"{'ui-table-scrollable-body-table': true, 'ui-table-virtual-table': dt.virtualScroll}\" [class]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                <tbody class=\"ui-table-tbody\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate\" [frozen]=\"frozen\"></tbody>\n            </table>\n            <table #loadingTable *ngIf=\"dt.virtualScroll && dt.loadingBodyTemplate != null\" [ngClass]=\"{'ui-table-scrollable-body-table ui-table-loading-virtual-table': true, 'ui-table-virtual-table': dt.virtualScroll}\">\n                <tbody class=\"ui-table-tbody\">\n                    <ng-template ngFor [ngForOf]=\"loadingArray\">\n                        <ng-container *ngTemplateOutlet=\"dt.loadingBodyTemplate; context: {columns: columns}\"></ng-container>\n                    </ng-template>\n                </tbody>\n            </table>\n            <div #virtualScroller class=\"ui-table-virtual-scroller\" *ngIf=\"dt.virtualScroll\"></div>\n        </div>\n        <div #scrollFooter *ngIf=\"dt.footerTemplate\" class=\"ui-table-scrollable-footer ui-widget-header\">\n            <div #scrollFooterBox class=\"ui-table-scrollable-footer-box\">\n                <table class=\"ui-table-scrollable-footer-table\" [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <tfoot class=\"ui-table-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenFooterTemplate||dt.footerTemplate : dt.footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n        </div>\n    "
        })
    ], ScrollableView);
    return ScrollableView;
}());
export { ScrollableView };
var SortableColumn = /** @class */ (function () {
    function SortableColumn(dt) {
        var _this = this;
        this.dt = dt;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
                _this.updateSortState();
            });
        }
    }
    SortableColumn.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    };
    SortableColumn.prototype.updateSortState = function () {
        this.sorted = this.dt.isSorted(this.field);
    };
    SortableColumn.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });
            DomHandler.clearSelection();
        }
    };
    SortableColumn.prototype.onEnterKey = function (event) {
        this.onClick(event);
    };
    SortableColumn.prototype.isEnabled = function () {
        return this.pSortableColumnDisabled !== true;
    };
    SortableColumn.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    SortableColumn.ctorParameters = function () { return [
        { type: Table }
    ]; };
    __decorate([
        Input("pSortableColumn")
    ], SortableColumn.prototype, "field", void 0);
    __decorate([
        Input()
    ], SortableColumn.prototype, "pSortableColumnDisabled", void 0);
    __decorate([
        HostListener('click', ['$event'])
    ], SortableColumn.prototype, "onClick", null);
    __decorate([
        HostListener('keydown.enter', ['$event'])
    ], SortableColumn.prototype, "onEnterKey", null);
    SortableColumn = __decorate([
        Directive({
            selector: '[pSortableColumn]',
            host: {
                '[class.ui-sortable-column]': 'isEnabled()',
                '[class.ui-state-highlight]': 'sorted',
                '[attr.tabindex]': 'isEnabled() ? "0" : null'
            }
        })
    ], SortableColumn);
    return SortableColumn;
}());
export { SortableColumn };
var SortIcon = /** @class */ (function () {
    function SortIcon(dt) {
        var _this = this;
        this.dt = dt;
        this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
            _this.updateSortState();
        });
    }
    SortIcon.prototype.ngOnInit = function () {
        this.updateSortState();
    };
    SortIcon.prototype.onClick = function (event) {
        event.preventDefault();
    };
    SortIcon.prototype.updateSortState = function () {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        }
        else if (this.dt.sortMode === 'multiple') {
            var sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
    };
    SortIcon.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    SortIcon.ctorParameters = function () { return [
        { type: Table }
    ]; };
    __decorate([
        Input()
    ], SortIcon.prototype, "field", void 0);
    SortIcon = __decorate([
        Component({
            selector: 'p-sortIcon',
            template: "\n        <i class=\"ui-sortable-column-icon pi pi-fw\" [ngClass]=\"{'pi-sort-up': sortOrder === 1, 'pi-sort-down': sortOrder === -1, 'pi-sort': sortOrder === 0}\"></i>\n    "
        })
    ], SortIcon);
    return SortIcon;
}());
export { SortIcon };
var SelectableRow = /** @class */ (function () {
    function SelectableRow(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.selected = _this.dt.isSelected(_this.data);
            });
        }
    }
    SelectableRow.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    };
    SelectableRow.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    };
    SelectableRow.prototype.onTouchEnd = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowTouchEnd(event);
        }
    };
    SelectableRow.prototype.onKeyDown = function (event) {
        if (this.isEnabled()) {
            var row = event.target;
            switch (event.which) {
                //down arrow
                case 40:
                    var nextRow = this.findNextSelectableRow(row);
                    if (nextRow) {
                        nextRow.focus();
                    }
                    event.preventDefault();
                    break;
                //up arrow
                case 38:
                    var prevRow = this.findPrevSelectableRow(row);
                    if (prevRow) {
                        prevRow.focus();
                    }
                    event.preventDefault();
                    break;
                //enter
                case 13:
                    this.dt.handleRowClick({
                        originalEvent: event,
                        rowData: this.data,
                        rowIndex: this.index
                    });
                    break;
                default:
                    //no op
                    break;
            }
        }
    };
    SelectableRow.prototype.findNextSelectableRow = function (row) {
        var nextRow = row.nextElementSibling;
        if (nextRow) {
            if (DomHandler.hasClass(nextRow, 'ui-selectable-row'))
                return nextRow;
            else
                return this.findNextSelectableRow(nextRow);
        }
        else {
            return null;
        }
    };
    SelectableRow.prototype.findPrevSelectableRow = function (row) {
        var prevRow = row.previousElementSibling;
        if (prevRow) {
            if (DomHandler.hasClass(prevRow, 'ui-selectable-row'))
                return prevRow;
            else
                return this.findPrevSelectableRow(prevRow);
        }
        else {
            return null;
        }
    };
    SelectableRow.prototype.isEnabled = function () {
        return this.pSelectableRowDisabled !== true;
    };
    SelectableRow.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    SelectableRow.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        Input("pSelectableRow")
    ], SelectableRow.prototype, "data", void 0);
    __decorate([
        Input("pSelectableRowIndex")
    ], SelectableRow.prototype, "index", void 0);
    __decorate([
        Input()
    ], SelectableRow.prototype, "pSelectableRowDisabled", void 0);
    __decorate([
        HostListener('click', ['$event'])
    ], SelectableRow.prototype, "onClick", null);
    __decorate([
        HostListener('touchend', ['$event'])
    ], SelectableRow.prototype, "onTouchEnd", null);
    __decorate([
        HostListener('keydown', ['$event'])
    ], SelectableRow.prototype, "onKeyDown", null);
    SelectableRow = __decorate([
        Directive({
            selector: '[pSelectableRow]',
            host: {
                '[class.ui-selectable-row]': 'isEnabled()',
                '[class.ui-state-highlight]': 'selected',
                '[attr.tabindex]': 'isEnabled() ? 0 : undefined',
            }
        })
    ], SelectableRow);
    return SelectableRow;
}());
export { SelectableRow };
var SelectableRowDblClick = /** @class */ (function () {
    function SelectableRowDblClick(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.selected = _this.dt.isSelected(_this.data);
            });
        }
    }
    SelectableRowDblClick.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    };
    SelectableRowDblClick.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    };
    SelectableRowDblClick.prototype.isEnabled = function () {
        return this.pSelectableRowDisabled !== true;
    };
    SelectableRowDblClick.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    SelectableRowDblClick.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        Input("pSelectableRowDblClick")
    ], SelectableRowDblClick.prototype, "data", void 0);
    __decorate([
        Input("pSelectableRowIndex")
    ], SelectableRowDblClick.prototype, "index", void 0);
    __decorate([
        Input()
    ], SelectableRowDblClick.prototype, "pSelectableRowDisabled", void 0);
    __decorate([
        HostListener('dblclick', ['$event'])
    ], SelectableRowDblClick.prototype, "onClick", null);
    SelectableRowDblClick = __decorate([
        Directive({
            selector: '[pSelectableRowDblClick]',
            host: {
                '[class.ui-selectable-row]': 'isEnabled()',
                '[class.ui-state-highlight]': 'selected'
            }
        })
    ], SelectableRowDblClick);
    return SelectableRowDblClick;
}());
export { SelectableRowDblClick };
var ContextMenuRow = /** @class */ (function () {
    function ContextMenuRow(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.contextMenuSource$.subscribe(function (data) {
                _this.selected = _this.dt.equals(_this.data, data);
            });
        }
    }
    ContextMenuRow.prototype.onContextMenu = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowRightClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
            event.preventDefault();
        }
    };
    ContextMenuRow.prototype.isEnabled = function () {
        return this.pContextMenuRowDisabled !== true;
    };
    ContextMenuRow.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ContextMenuRow.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        Input("pContextMenuRow")
    ], ContextMenuRow.prototype, "data", void 0);
    __decorate([
        Input("pContextMenuRowIndex")
    ], ContextMenuRow.prototype, "index", void 0);
    __decorate([
        Input()
    ], ContextMenuRow.prototype, "pContextMenuRowDisabled", void 0);
    __decorate([
        HostListener('contextmenu', ['$event'])
    ], ContextMenuRow.prototype, "onContextMenu", null);
    ContextMenuRow = __decorate([
        Directive({
            selector: '[pContextMenuRow]',
            host: {
                '[class.ui-contextmenu-selected]': 'selected'
            }
        })
    ], ContextMenuRow);
    return ContextMenuRow;
}());
export { ContextMenuRow };
var RowToggler = /** @class */ (function () {
    function RowToggler(dt) {
        this.dt = dt;
    }
    RowToggler.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    };
    RowToggler.prototype.isEnabled = function () {
        return this.pRowTogglerDisabled !== true;
    };
    RowToggler.ctorParameters = function () { return [
        { type: Table }
    ]; };
    __decorate([
        Input('pRowToggler')
    ], RowToggler.prototype, "data", void 0);
    __decorate([
        Input()
    ], RowToggler.prototype, "pRowTogglerDisabled", void 0);
    __decorate([
        HostListener('click', ['$event'])
    ], RowToggler.prototype, "onClick", null);
    RowToggler = __decorate([
        Directive({
            selector: '[pRowToggler]'
        })
    ], RowToggler);
    return RowToggler;
}());
export { RowToggler };
var ResizableColumn = /** @class */ (function () {
    function ResizableColumn(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ResizableColumn.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'ui-resizable-column');
            this.resizer = document.createElement('span');
            this.resizer.className = 'ui-column-resizer ui-clickable';
            this.el.nativeElement.appendChild(this.resizer);
            this.zone.runOutsideAngular(function () {
                _this.resizerMouseDownListener = _this.onMouseDown.bind(_this);
                _this.resizer.addEventListener('mousedown', _this.resizerMouseDownListener);
            });
        }
    };
    ResizableColumn.prototype.bindDocumentEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentMouseMoveListener = _this.onDocumentMouseMove.bind(_this);
            document.addEventListener('mousemove', _this.documentMouseMoveListener);
            _this.documentMouseUpListener = _this.onDocumentMouseUp.bind(_this);
            document.addEventListener('mouseup', _this.documentMouseUpListener);
        });
    };
    ResizableColumn.prototype.unbindDocumentEvents = function () {
        if (this.documentMouseMoveListener) {
            document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    };
    ResizableColumn.prototype.onMouseDown = function (event) {
        if (event.which === 1) {
            this.dt.onColumnResizeBegin(event);
            this.bindDocumentEvents();
        }
    };
    ResizableColumn.prototype.onDocumentMouseMove = function (event) {
        this.dt.onColumnResize(event);
    };
    ResizableColumn.prototype.onDocumentMouseUp = function (event) {
        this.dt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
    };
    ResizableColumn.prototype.isEnabled = function () {
        return this.pResizableColumnDisabled !== true;
    };
    ResizableColumn.prototype.ngOnDestroy = function () {
        if (this.resizerMouseDownListener) {
            this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
        }
        this.unbindDocumentEvents();
    };
    ResizableColumn.ctorParameters = function () { return [
        { type: Table },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], ResizableColumn.prototype, "pResizableColumnDisabled", void 0);
    ResizableColumn = __decorate([
        Directive({
            selector: '[pResizableColumn]'
        })
    ], ResizableColumn);
    return ResizableColumn;
}());
export { ResizableColumn };
var ReorderableColumn = /** @class */ (function () {
    function ReorderableColumn(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ReorderableColumn.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    };
    ReorderableColumn.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.mouseDownListener = _this.onMouseDown.bind(_this);
            _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
            _this.dragStartListener = _this.onDragStart.bind(_this);
            _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
            _this.dragOverListener = _this.onDragEnter.bind(_this);
            _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            _this.dragEnterListener = _this.onDragEnter.bind(_this);
            _this.el.nativeElement.addEventListener('dragenter', _this.dragEnterListener);
            _this.dragLeaveListener = _this.onDragLeave.bind(_this);
            _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
        });
    };
    ReorderableColumn.prototype.unbindEvents = function () {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    };
    ReorderableColumn.prototype.onMouseDown = function (event) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.hasClass(event.target, 'ui-column-resizer'))
            this.el.nativeElement.draggable = false;
        else
            this.el.nativeElement.draggable = true;
    };
    ReorderableColumn.prototype.onDragStart = function (event) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    };
    ReorderableColumn.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    ReorderableColumn.prototype.onDragEnter = function (event) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    };
    ReorderableColumn.prototype.onDragLeave = function (event) {
        this.dt.onColumnDragLeave(event);
    };
    ReorderableColumn.prototype.onDrop = function (event) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    };
    ReorderableColumn.prototype.isEnabled = function () {
        return this.pReorderableColumnDisabled !== true;
    };
    ReorderableColumn.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    ReorderableColumn.ctorParameters = function () { return [
        { type: Table },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], ReorderableColumn.prototype, "pReorderableColumnDisabled", void 0);
    __decorate([
        HostListener('drop', ['$event'])
    ], ReorderableColumn.prototype, "onDrop", null);
    ReorderableColumn = __decorate([
        Directive({
            selector: '[pReorderableColumn]'
        })
    ], ReorderableColumn);
    return ReorderableColumn;
}());
export { ReorderableColumn };
var EditableColumn = /** @class */ (function () {
    function EditableColumn(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    EditableColumn.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'ui-editable-column');
        }
    };
    EditableColumn.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.editingCellClick = true;
            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.dt.isEditingCellValid()) {
                        return;
                    }
                    DomHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    };
    EditableColumn.prototype.openCell = function () {
        var _this = this;
        this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field);
        DomHandler.addClass(this.el.nativeElement, 'ui-editing-cell');
        this.dt.onEditInit.emit({ field: this.field, data: this.data });
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                var focusCellSelector = _this.pFocusCellSelector || 'input, textarea, select';
                var focusableElement = DomHandler.findSingle(_this.el.nativeElement, focusCellSelector);
                if (focusableElement) {
                    focusableElement.focus();
                }
            }, 50);
        });
    };
    EditableColumn.prototype.closeEditingCell = function () {
        DomHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
        this.dt.editingCell = null;
        this.dt.editingCellData = null;
        this.dt.editingCellField = null;
        this.dt.unbindDocumentEditListener();
    };
    EditableColumn.prototype.onKeyDown = function (event) {
        if (this.isEnabled()) {
            //enter
            if (event.keyCode == 13) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell();
                    this.dt.onEditComplete.emit({ field: this.field, data: this.data, originalEvent: event });
                }
                event.preventDefault();
            }
            //escape
            else if (event.keyCode == 27) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell();
                    this.dt.onEditCancel.emit({ field: this.field, data: this.data, originalEvent: event });
                }
                event.preventDefault();
            }
            //tab
            else if (event.keyCode == 9) {
                this.dt.onEditComplete.emit({ field: this.field, data: this.data, originalEvent: event });
                if (event.shiftKey)
                    this.moveToPreviousCell(event);
                else
                    this.moveToNextCell(event);
            }
        }
    };
    EditableColumn.prototype.findCell = function (element) {
        if (element) {
            var cell = element;
            while (cell && !DomHandler.hasClass(cell, 'ui-editing-cell')) {
                cell = cell.parentElement;
            }
            return cell;
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.moveToPreviousCell = function (event) {
        var currentCell = this.findCell(event.target);
        var row = currentCell.parentElement;
        var targetCell = this.findPreviousEditableColumn(currentCell);
        if (targetCell) {
            DomHandler.invokeElementMethod(event.target, 'blur');
            DomHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    };
    EditableColumn.prototype.moveToNextCell = function (event) {
        var currentCell = this.findCell(event.target);
        var row = currentCell.parentElement;
        var targetCell = this.findNextEditableColumn(currentCell);
        if (targetCell) {
            DomHandler.invokeElementMethod(event.target, 'blur');
            DomHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    };
    EditableColumn.prototype.findPreviousEditableColumn = function (cell) {
        var prevCell = cell.previousElementSibling;
        if (!prevCell) {
            var previousRow = cell.parentElement.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        if (prevCell) {
            if (DomHandler.hasClass(prevCell, 'ui-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.findNextEditableColumn = function (cell) {
        var nextCell = cell.nextElementSibling;
        if (!nextCell) {
            var nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        if (nextCell) {
            if (DomHandler.hasClass(nextCell, 'ui-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.isEnabled = function () {
        return this.pEditableColumnDisabled !== true;
    };
    EditableColumn.ctorParameters = function () { return [
        { type: Table },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input("pEditableColumn")
    ], EditableColumn.prototype, "data", void 0);
    __decorate([
        Input("pEditableColumnField")
    ], EditableColumn.prototype, "field", void 0);
    __decorate([
        Input()
    ], EditableColumn.prototype, "pEditableColumnDisabled", void 0);
    __decorate([
        Input()
    ], EditableColumn.prototype, "pFocusCellSelector", void 0);
    __decorate([
        HostListener('click', ['$event'])
    ], EditableColumn.prototype, "onClick", null);
    __decorate([
        HostListener('keydown', ['$event'])
    ], EditableColumn.prototype, "onKeyDown", null);
    EditableColumn = __decorate([
        Directive({
            selector: '[pEditableColumn]'
        })
    ], EditableColumn);
    return EditableColumn;
}());
export { EditableColumn };
var EditableRow = /** @class */ (function () {
    function EditableRow(el) {
        this.el = el;
    }
    EditableRow.prototype.isEnabled = function () {
        return this.pEditableRowDisabled !== true;
    };
    EditableRow.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input("pEditableRow")
    ], EditableRow.prototype, "data", void 0);
    __decorate([
        Input()
    ], EditableRow.prototype, "pEditableRowDisabled", void 0);
    EditableRow = __decorate([
        Directive({
            selector: '[pEditableRow]'
        })
    ], EditableRow);
    return EditableRow;
}());
export { EditableRow };
var InitEditableRow = /** @class */ (function () {
    function InitEditableRow(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    InitEditableRow.prototype.onClick = function (event) {
        this.dt.initRowEdit(this.editableRow.data);
        event.preventDefault();
    };
    InitEditableRow.ctorParameters = function () { return [
        { type: Table },
        { type: EditableRow }
    ]; };
    __decorate([
        HostListener('click', ['$event'])
    ], InitEditableRow.prototype, "onClick", null);
    InitEditableRow = __decorate([
        Directive({
            selector: '[pInitEditableRow]'
        })
    ], InitEditableRow);
    return InitEditableRow;
}());
export { InitEditableRow };
var SaveEditableRow = /** @class */ (function () {
    function SaveEditableRow(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    SaveEditableRow.prototype.onClick = function (event) {
        this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
        event.preventDefault();
    };
    SaveEditableRow.ctorParameters = function () { return [
        { type: Table },
        { type: EditableRow }
    ]; };
    __decorate([
        HostListener('click', ['$event'])
    ], SaveEditableRow.prototype, "onClick", null);
    SaveEditableRow = __decorate([
        Directive({
            selector: '[pSaveEditableRow]'
        })
    ], SaveEditableRow);
    return SaveEditableRow;
}());
export { SaveEditableRow };
var CancelEditableRow = /** @class */ (function () {
    function CancelEditableRow(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    CancelEditableRow.prototype.onClick = function (event) {
        this.dt.cancelRowEdit(this.editableRow.data);
        event.preventDefault();
    };
    CancelEditableRow.ctorParameters = function () { return [
        { type: Table },
        { type: EditableRow }
    ]; };
    __decorate([
        HostListener('click', ['$event'])
    ], CancelEditableRow.prototype, "onClick", null);
    CancelEditableRow = __decorate([
        Directive({
            selector: '[pCancelEditableRow]'
        })
    ], CancelEditableRow);
    return CancelEditableRow;
}());
export { CancelEditableRow };
var CellEditor = /** @class */ (function () {
    function CellEditor(dt, editableColumn, editableRow) {
        this.dt = dt;
        this.editableColumn = editableColumn;
        this.editableRow = editableRow;
    }
    CellEditor.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'input':
                    _this.inputTemplate = item.template;
                    break;
                case 'output':
                    _this.outputTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(CellEditor.prototype, "editing", {
        get: function () {
            return (this.dt.editingCell && this.editableColumn && this.dt.editingCell === this.editableColumn.el.nativeElement) ||
                (this.editableRow && this.dt.editMode === 'row' && this.dt.isRowEditing(this.editableRow.data));
        },
        enumerable: true,
        configurable: true
    });
    CellEditor.ctorParameters = function () { return [
        { type: Table },
        { type: EditableColumn, decorators: [{ type: Optional }] },
        { type: EditableRow, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        ContentChildren(PrimeTemplate)
    ], CellEditor.prototype, "templates", void 0);
    CellEditor = __decorate([
        Component({
            selector: 'p-cellEditor',
            template: "\n        <ng-container *ngIf=\"editing\">\n            <ng-container *ngTemplateOutlet=\"inputTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!editing\">\n            <ng-container *ngTemplateOutlet=\"outputTemplate\"></ng-container>\n        </ng-container>\n    "
        }),
        __param(1, Optional()), __param(2, Optional())
    ], CellEditor);
    return CellEditor;
}());
export { CellEditor };
var TableRadioButton = /** @class */ (function () {
    function TableRadioButton(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.dt.isSelected(_this.value);
        });
    }
    TableRadioButton.prototype.ngOnInit = function () {
        this.checked = this.dt.isSelected(this.value);
    };
    TableRadioButton.prototype.onClick = function (event) {
        if (!this.disabled) {
            this.dt.toggleRowWithRadio({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        DomHandler.clearSelection();
    };
    TableRadioButton.prototype.onFocus = function () {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableRadioButton.prototype.onBlur = function () {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableRadioButton.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TableRadioButton.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        Input()
    ], TableRadioButton.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], TableRadioButton.prototype, "value", void 0);
    __decorate([
        Input()
    ], TableRadioButton.prototype, "index", void 0);
    __decorate([
        ViewChild('box', { static: true })
    ], TableRadioButton.prototype, "boxViewChild", void 0);
    TableRadioButton = __decorate([
        Component({
            selector: 'p-tableRadioButton',
            template: "\n        <div class=\"ui-radiobutton ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"radio\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\">\n            </div>\n            <div #box [ngClass]=\"{'ui-radiobutton-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\">\n                <span class=\"ui-radiobutton-icon ui-clickable\" [ngClass]=\"{'pi pi-circle-on':checked}\"></span>\n            </div>\n        </div>\n    "
        })
    ], TableRadioButton);
    return TableRadioButton;
}());
export { TableRadioButton };
var TableCheckbox = /** @class */ (function () {
    function TableCheckbox(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.dt.isSelected(_this.value);
        });
    }
    TableCheckbox.prototype.ngOnInit = function () {
        this.checked = this.dt.isSelected(this.value);
    };
    TableCheckbox.prototype.onClick = function (event) {
        if (!this.disabled) {
            this.dt.toggleRowWithCheckbox({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        DomHandler.clearSelection();
    };
    TableCheckbox.prototype.onFocus = function () {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableCheckbox.prototype.onBlur = function () {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableCheckbox.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TableCheckbox.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        Input()
    ], TableCheckbox.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], TableCheckbox.prototype, "value", void 0);
    __decorate([
        Input()
    ], TableCheckbox.prototype, "index", void 0);
    __decorate([
        ViewChild('box', { static: true })
    ], TableCheckbox.prototype, "boxViewChild", void 0);
    TableCheckbox = __decorate([
        Component({
            selector: 'p-tableCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
        })
    ], TableCheckbox);
    return TableCheckbox;
}());
export { TableCheckbox };
var TableHeaderCheckbox = /** @class */ (function () {
    function TableHeaderCheckbox(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(function () {
            _this.checked = _this.updateCheckedState();
        });
        this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.updateCheckedState();
        });
    }
    TableHeaderCheckbox.prototype.ngOnInit = function () {
        this.checked = this.updateCheckedState();
    };
    TableHeaderCheckbox.prototype.onClick = function (event) {
        if (!this.disabled) {
            if (this.dt.value && this.dt.value.length > 0) {
                this.dt.toggleRowsWithCheckbox(event, !this.checked);
            }
        }
        DomHandler.clearSelection();
    };
    TableHeaderCheckbox.prototype.onFocus = function () {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableHeaderCheckbox.prototype.onBlur = function () {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableHeaderCheckbox.prototype.isDisabled = function () {
        return this.disabled || !this.dt.value || !this.dt.value.length;
    };
    TableHeaderCheckbox.prototype.ngOnDestroy = function () {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    };
    TableHeaderCheckbox.prototype.updateCheckedState = function () {
        if (this.dt.filteredValue) {
            var val = this.dt.filteredValue;
            return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.isAllFilteredValuesChecked());
        }
        else {
            var val = this.dt.value;
            return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === val.length);
        }
    };
    TableHeaderCheckbox.prototype.isAllFilteredValuesChecked = function () {
        var e_3, _a;
        if (!this.dt.filteredValue) {
            return false;
        }
        else {
            try {
                for (var _b = __values(this.dt.filteredValue), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var rowData = _c.value;
                    if (!this.dt.isSelected(rowData)) {
                        return false;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return true;
        }
    };
    TableHeaderCheckbox.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        ViewChild('box', { static: true })
    ], TableHeaderCheckbox.prototype, "boxViewChild", void 0);
    __decorate([
        Input()
    ], TableHeaderCheckbox.prototype, "disabled", void 0);
    TableHeaderCheckbox = __decorate([
        Component({
            selector: 'p-tableHeaderCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"isDisabled()\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled': isDisabled()}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
        })
    ], TableHeaderCheckbox);
    return TableHeaderCheckbox;
}());
export { TableHeaderCheckbox };
var ReorderableRowHandle = /** @class */ (function () {
    function ReorderableRowHandle(el) {
        this.el = el;
    }
    ReorderableRowHandle.prototype.ngAfterViewInit = function () {
        DomHandler.addClass(this.el.nativeElement, 'ui-table-reorderablerow-handle');
    };
    ReorderableRowHandle.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input("pReorderableRowHandle")
    ], ReorderableRowHandle.prototype, "index", void 0);
    ReorderableRowHandle = __decorate([
        Directive({
            selector: '[pReorderableRowHandle]'
        })
    ], ReorderableRowHandle);
    return ReorderableRowHandle;
}());
export { ReorderableRowHandle };
var ReorderableRow = /** @class */ (function () {
    function ReorderableRow(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ReorderableRow.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    };
    ReorderableRow.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.mouseDownListener = _this.onMouseDown.bind(_this);
            _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
            _this.dragStartListener = _this.onDragStart.bind(_this);
            _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
            _this.dragEndListener = _this.onDragEnd.bind(_this);
            _this.el.nativeElement.addEventListener('dragend', _this.dragEndListener);
            _this.dragOverListener = _this.onDragOver.bind(_this);
            _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            _this.dragLeaveListener = _this.onDragLeave.bind(_this);
            _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
        });
    };
    ReorderableRow.prototype.unbindEvents = function () {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragStartListener) {
            document.removeEventListener('dragstart', this.dragStartListener);
            this.dragStartListener = null;
        }
        if (this.dragEndListener) {
            document.removeEventListener('dragend', this.dragEndListener);
            this.dragEndListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    };
    ReorderableRow.prototype.onMouseDown = function (event) {
        if (DomHandler.hasClass(event.target, 'ui-table-reorderablerow-handle'))
            this.el.nativeElement.draggable = true;
        else
            this.el.nativeElement.draggable = false;
    };
    ReorderableRow.prototype.onDragStart = function (event) {
        this.dt.onRowDragStart(event, this.index);
    };
    ReorderableRow.prototype.onDragEnd = function (event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    };
    ReorderableRow.prototype.onDragOver = function (event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    };
    ReorderableRow.prototype.onDragLeave = function (event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    };
    ReorderableRow.prototype.isEnabled = function () {
        return this.pReorderableRowDisabled !== true;
    };
    ReorderableRow.prototype.onDrop = function (event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }
        event.preventDefault();
    };
    ReorderableRow.ctorParameters = function () { return [
        { type: Table },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input("pReorderableRow")
    ], ReorderableRow.prototype, "index", void 0);
    __decorate([
        Input()
    ], ReorderableRow.prototype, "pReorderableRowDisabled", void 0);
    __decorate([
        HostListener('drop', ['$event'])
    ], ReorderableRow.prototype, "onDrop", null);
    ReorderableRow = __decorate([
        Directive({
            selector: '[pReorderableRow]'
        })
    ], ReorderableRow);
    return ReorderableRow;
}());
export { ReorderableRow };
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule = __decorate([
        NgModule({
            imports: [CommonModule, PaginatorModule],
            exports: [Table, SharedModule, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow],
            declarations: [Table, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, ScrollableView, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow]
        })
    ], TableModule);
    return TableModule;
}());
export { TableModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3RhYmxlLyIsInNvdXJjZXMiOlsidGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pWLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc1QztJQUFBO1FBRVksZUFBVSxHQUFHLElBQUksT0FBTyxFQUF1QixDQUFDO1FBQ2hELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNoQyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQ3ZD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QVksRUFBRSxDQUFDLEtBQUssRUFBQyxjQUFjLEVBQUMsYUFBYSxFQUFDLFVBQVUsRUFBQyxjQUFjLEVBQUMsZUFBZSxFQUFDLGlCQUFpQixFQUFDLGNBQWMsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUMsZ0JBQWdCLEVBQUMsYUFBYSxFQUFDLG1CQUFtQixFQUFDLG9CQUFvQixFQUFDLGNBQWMsRUFBQyxxQkFBcUIsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLGVBQWUsRUFBQyxpQkFBaUIsQ0FBQztTQUN4VixDQUFDO09BQ1csV0FBVyxDQUFJO0lBQUQsa0JBQUM7Q0FBQSxBQUE1QixJQUE0QjtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkLCBEaXJlY3RpdmUsIE9wdGlvbmFsLCBBZnRlckNvbnRlbnRJbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIENvbnRlbnRDaGlsZHJlbiwgVGVtcGxhdGVSZWYsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBOZ1pvbmUsIEVtYmVkZGVkVmlld1JlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUGFnaW5hdG9yTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wYWdpbmF0b3InO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBTb3J0TWV0YSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFRhYmxlU3RhdGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBGaWx0ZXJNZXRhZGF0YSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJsb2NrYWJsZVVJIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWx0ZXJVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFibGVTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgc29ydFNvdXJjZSA9IG5ldyBTdWJqZWN0PFNvcnRNZXRhfFNvcnRNZXRhW10+KCk7XG4gICAgcHJpdmF0ZSBzZWxlY3Rpb25Tb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgY29udGV4dE1lbnVTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgcHJpdmF0ZSB2YWx1ZVNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICBwcml2YXRlIHRvdGFsUmVjb3Jkc1NvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICBwcml2YXRlIGNvbHVtbnNTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgc29ydFNvdXJjZSQgPSB0aGlzLnNvcnRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgc2VsZWN0aW9uU291cmNlJCA9IHRoaXMuc2VsZWN0aW9uU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGNvbnRleHRNZW51U291cmNlJCA9IHRoaXMuY29udGV4dE1lbnVTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgdmFsdWVTb3VyY2UkID0gdGhpcy52YWx1ZVNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICB0b3RhbFJlY29yZHNTb3VyY2UkID0gdGhpcy50b3RhbFJlY29yZHNTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgY29sdW1uc1NvdXJjZSQgPSB0aGlzLmNvbHVtbnNTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBvblNvcnQoc29ydE1ldGE6IFNvcnRNZXRhfFNvcnRNZXRhW10pIHtcbiAgICAgICAgdGhpcy5zb3J0U291cmNlLm5leHQoc29ydE1ldGEpO1xuICAgIH1cblxuICAgIG9uU2VsZWN0aW9uQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvblNvdXJjZS5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25Db250ZXh0TWVudShkYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudVNvdXJjZS5uZXh0KGRhdGEpO1xuICAgIH1cblxuICAgIG9uVmFsdWVDaGFuZ2UodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnZhbHVlU291cmNlLm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIG9uVG90YWxSZWNvcmRzQ2hhbmdlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50b3RhbFJlY29yZHNTb3VyY2UubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgb25Db2x1bW5zQ2hhbmdlKGNvbHVtbnM6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuY29sdW1uc1NvdXJjZS5uZXh0KGNvbHVtbnMpO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRhYmxlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXRhYmxlIHVpLXdpZGdldCc6IHRydWUsICd1aS10YWJsZS1yZXNwb25zaXZlJzogcmVzcG9uc2l2ZSwgJ3VpLXRhYmxlLXJlc2l6YWJsZSc6IHJlc2l6YWJsZUNvbHVtbnMsXG4gICAgICAgICAgICAgICAgJ3VpLXRhYmxlLXJlc2l6YWJsZS1maXQnOiAocmVzaXphYmxlQ29sdW1ucyAmJiBjb2x1bW5SZXNpemVNb2RlID09PSAnZml0JyksXG4gICAgICAgICAgICAgICAgJ3VpLXRhYmxlLWhvdmVyYWJsZS1yb3dzJzogKHJvd0hvdmVyfHxzZWxlY3Rpb25Nb2RlKSwgJ3VpLXRhYmxlLWF1dG8tbGF5b3V0JzogYXV0b0xheW91dH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10YWJsZS1sb2FkaW5nIHVpLXdpZGdldC1vdmVybGF5XCIgKm5nSWY9XCJsb2FkaW5nICYmIHNob3dMb2FkZXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10YWJsZS1sb2FkaW5nLWNvbnRlbnRcIiAqbmdJZj1cImxvYWRpbmcgJiYgc2hvd0xvYWRlclwiPlxuICAgICAgICAgICAgICAgIDxpIFtjbGFzc109XCIndWktdGFibGUtbG9hZGluZy1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY2FwdGlvblRlbXBsYXRlXCIgY2xhc3M9XCJ1aS10YWJsZS1jYXB0aW9uIHVpLXdpZGdldC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FwdGlvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwLXBhZ2luYXRvciBbcm93c109XCJyb3dzXCIgW2ZpcnN0XT1cImZpcnN0XCIgW3RvdGFsUmVjb3Jkc109XCJ0b3RhbFJlY29yZHNcIiBbcGFnZUxpbmtTaXplXT1cInBhZ2VMaW5rc1wiIHN0eWxlQ2xhc3M9XCJ1aS1wYWdpbmF0b3ItdG9wXCIgW2Fsd2F5c1Nob3ddPVwiYWx3YXlzU2hvd1BhZ2luYXRvclwiXG4gICAgICAgICAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJvblBhZ2VDaGFuZ2UoJGV2ZW50KVwiIFtyb3dzUGVyUGFnZU9wdGlvbnNdPVwicm93c1BlclBhZ2VPcHRpb25zXCIgKm5nSWY9XCJwYWdpbmF0b3IgJiYgKHBhZ2luYXRvclBvc2l0aW9uID09PSAndG9wJyB8fCBwYWdpbmF0b3JQb3NpdGlvbiA9PSdib3RoJylcIlxuICAgICAgICAgICAgICAgIFt0ZW1wbGF0ZUxlZnRdPVwicGFnaW5hdG9yTGVmdFRlbXBsYXRlXCIgW3RlbXBsYXRlUmlnaHRdPVwicGFnaW5hdG9yUmlnaHRUZW1wbGF0ZVwiIFtkcm9wZG93bkFwcGVuZFRvXT1cInBhZ2luYXRvckRyb3Bkb3duQXBwZW5kVG9cIiBbZHJvcGRvd25TY3JvbGxIZWlnaHRdPVwicGFnaW5hdG9yRHJvcGRvd25TY3JvbGxIZWlnaHRcIlxuICAgICAgICAgICAgICAgIFtjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXT1cImN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVcIiBbc2hvd0N1cnJlbnRQYWdlUmVwb3J0XT1cInNob3dDdXJyZW50UGFnZVJlcG9ydFwiPjwvcC1wYWdpbmF0b3I+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10YWJsZS13cmFwcGVyXCIgKm5nSWY9XCIhc2Nyb2xsYWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSAjdGFibGUgW25nQ2xhc3NdPVwidGFibGVTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwidGFibGVTdHlsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sR3JvdXBUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJ1aS10YWJsZS10aGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ1aS10YWJsZS10Ym9keVwiIFtwVGFibGVCb2R5XT1cImNvbHVtbnNcIiBbcFRhYmxlQm9keVRlbXBsYXRlXT1cImJvZHlUZW1wbGF0ZVwiPjwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0Zm9vdCAqbmdJZj1cImZvb3RlclRlbXBsYXRlXCIgY2xhc3M9XCJ1aS10YWJsZS10Zm9vdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlOyBjb250ZXh0IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS13cmFwcGVyXCIgKm5nSWY9XCJzY3JvbGxhYmxlXCI+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS12aWV3IHVpLXRhYmxlLWZyb3plbi12aWV3XCIgKm5nSWY9XCJmcm96ZW5Db2x1bW5zfHxmcm96ZW5Cb2R5VGVtcGxhdGVcIiBbcFNjcm9sbGFibGVWaWV3XT1cImZyb3plbkNvbHVtbnNcIiBbZnJvemVuXT1cInRydWVcIiBbbmdTdHlsZV09XCJ7d2lkdGg6IGZyb3plbldpZHRofVwiIFtzY3JvbGxIZWlnaHRdPVwic2Nyb2xsSGVpZ2h0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS12aWV3XCIgW3BTY3JvbGxhYmxlVmlld109XCJjb2x1bW5zXCIgW2Zyb3plbl09XCJmYWxzZVwiIFtzY3JvbGxIZWlnaHRdPVwic2Nyb2xsSGVpZ2h0XCIgW25nU3R5bGVdPVwie2xlZnQ6IGZyb3plbldpZHRoLCB3aWR0aDogJ2NhbGMoMTAwJSAtICcrZnJvemVuV2lkdGgrJyknfVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxwLXBhZ2luYXRvciBbcm93c109XCJyb3dzXCIgW2ZpcnN0XT1cImZpcnN0XCIgW3RvdGFsUmVjb3Jkc109XCJ0b3RhbFJlY29yZHNcIiBbcGFnZUxpbmtTaXplXT1cInBhZ2VMaW5rc1wiIHN0eWxlQ2xhc3M9XCJ1aS1wYWdpbmF0b3ItYm90dG9tXCIgW2Fsd2F5c1Nob3ddPVwiYWx3YXlzU2hvd1BhZ2luYXRvclwiXG4gICAgICAgICAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJvblBhZ2VDaGFuZ2UoJGV2ZW50KVwiIFtyb3dzUGVyUGFnZU9wdGlvbnNdPVwicm93c1BlclBhZ2VPcHRpb25zXCIgKm5nSWY9XCJwYWdpbmF0b3IgJiYgKHBhZ2luYXRvclBvc2l0aW9uID09PSAnYm90dG9tJyB8fCBwYWdpbmF0b3JQb3NpdGlvbiA9PSdib3RoJylcIlxuICAgICAgICAgICAgICAgIFt0ZW1wbGF0ZUxlZnRdPVwicGFnaW5hdG9yTGVmdFRlbXBsYXRlXCIgW3RlbXBsYXRlUmlnaHRdPVwicGFnaW5hdG9yUmlnaHRUZW1wbGF0ZVwiIFtkcm9wZG93bkFwcGVuZFRvXT1cInBhZ2luYXRvckRyb3Bkb3duQXBwZW5kVG9cIiBbZHJvcGRvd25TY3JvbGxIZWlnaHRdPVwicGFnaW5hdG9yRHJvcGRvd25TY3JvbGxIZWlnaHRcIlxuICAgICAgICAgICAgICAgIFtjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXT1cImN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVcIiBbc2hvd0N1cnJlbnRQYWdlUmVwb3J0XT1cInNob3dDdXJyZW50UGFnZVJlcG9ydFwiPjwvcC1wYWdpbmF0b3I+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic3VtbWFyeVRlbXBsYXRlXCIgY2xhc3M9XCJ1aS10YWJsZS1zdW1tYXJ5IHVpLXdpZGdldC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic3VtbWFyeVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiAjcmVzaXplSGVscGVyIGNsYXNzPVwidWktY29sdW1uLXJlc2l6ZXItaGVscGVyIHVpLXN0YXRlLWhpZ2hsaWdodFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgKm5nSWY9XCJyZXNpemFibGVDb2x1bW5zXCI+PC9kaXY+XG5cbiAgICAgICAgICAgIDxzcGFuICNyZW9yZGVySW5kaWNhdG9yVXAgY2xhc3M9XCJwaSBwaS1hcnJvdy1kb3duIHVpLXRhYmxlLXJlb3JkZXItaW5kaWNhdG9yLXVwXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiAqbmdJZj1cInJlb3JkZXJhYmxlQ29sdW1uc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICNyZW9yZGVySW5kaWNhdG9yRG93biBjbGFzcz1cInBpIHBpLWFycm93LXVwIHVpLXRhYmxlLXJlb3JkZXItaW5kaWNhdG9yLWRvd25cIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiICpuZ0lmPVwicmVvcmRlcmFibGVDb2x1bW5zXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW1RhYmxlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVGFibGUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIEJsb2NrYWJsZVVJLCBPbkNoYW5nZXMge1xuICAgIFxuICAgIEBJbnB1dCgpIGZyb3plbkNvbHVtbnM6IGFueVtdO1xuXG4gICAgQElucHV0KCkgZnJvemVuVmFsdWU6IGFueVtdO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSB0YWJsZVN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgdGFibGVTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwYWdpbmF0b3I6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBwYWdlTGlua3M6IG51bWJlciA9IDU7XG5cbiAgICBASW5wdXQoKSByb3dzUGVyUGFnZU9wdGlvbnM6IGFueVtdO1xuXG4gICAgQElucHV0KCkgYWx3YXlzU2hvd1BhZ2luYXRvcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBwYWdpbmF0b3JQb3NpdGlvbjogc3RyaW5nID0gJ2JvdHRvbSc7XG5cbiAgICBASW5wdXQoKSBwYWdpbmF0b3JEcm9wZG93bkFwcGVuZFRvOiBhbnk7XG5cbiAgICBASW5wdXQoKSBwYWdpbmF0b3JEcm9wZG93blNjcm9sbEhlaWdodDogc3RyaW5nID0gJzIwMHB4JztcblxuICAgIEBJbnB1dCgpIGN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGU6IHN0cmluZyA9ICd7Y3VycmVudFBhZ2V9IG9mIHt0b3RhbFBhZ2VzfSc7XG5cbiAgICBASW5wdXQoKSBzaG93Q3VycmVudFBhZ2VSZXBvcnQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBkZWZhdWx0U29ydE9yZGVyOiBudW1iZXIgPSAxO1xuXG4gICAgQElucHV0KCkgc29ydE1vZGU6IHN0cmluZyA9ICdzaW5nbGUnO1xuICAgIFxuICAgIEBJbnB1dCgpIHJlc2V0UGFnZU9uU29ydDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIGNvbnRleHRNZW51U2VsZWN0aW9uOiBhbnk7XG5cbiAgICBAT3V0cHV0KCkgY29udGV4dE1lbnVTZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgY29udGV4dE1lbnVTZWxlY3Rpb25Nb2RlOiBzdHJpbmcgPSBcInNlcGFyYXRlXCI7XG5cbiAgICBASW5wdXQoKSBkYXRhS2V5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBtZXRhS2V5U2VsZWN0aW9uOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcm93VHJhY2tCeTogRnVuY3Rpb24gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xuXG4gICAgQElucHV0KCkgbGF6eTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgbGF6eUxvYWRPbkluaXQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgY29tcGFyZVNlbGVjdGlvbkJ5OiBzdHJpbmcgPSAnZGVlcEVxdWFscyc7XG5cbiAgICBASW5wdXQoKSBjc3ZTZXBhcmF0b3I6IHN0cmluZyA9ICcsJztcblxuICAgIEBJbnB1dCgpIGV4cG9ydEZpbGVuYW1lOiBzdHJpbmcgPSAnZG93bmxvYWQnO1xuXG4gICAgQElucHV0KCkgZmlsdGVyczogeyBbczogc3RyaW5nXTogRmlsdGVyTWV0YWRhdGE7IH0gPSB7fTtcblxuICAgIEBJbnB1dCgpIGdsb2JhbEZpbHRlckZpZWxkczogc3RyaW5nW107XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJEZWxheTogbnVtYmVyID0gMzAwO1xuXG4gICAgQElucHV0KCkgZXhwYW5kZWRSb3dLZXlzOiB7IFtzOiBzdHJpbmddOiBib29sZWFuOyB9ID0ge307XG5cbiAgICBASW5wdXQoKSBlZGl0aW5nUm93S2V5czogeyBbczogc3RyaW5nXTogYm9vbGVhbjsgfSA9IHt9O1xuXG4gICAgQElucHV0KCkgcm93RXhwYW5kTW9kZTogc3RyaW5nID0gJ211bHRpcGxlJztcblxuICAgIEBJbnB1dCgpIHNjcm9sbGFibGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzY3JvbGxIZWlnaHQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHZpcnR1YWxTY3JvbGw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB2aXJ0dWFsU2Nyb2xsRGVsYXk6IG51bWJlciA9IDE1MDtcblxuICAgIEBJbnB1dCgpIHZpcnR1YWxSb3dIZWlnaHQ6IG51bWJlciA9IDI4O1xuXG4gICAgQElucHV0KCkgZnJvemVuV2lkdGg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHJlc3BvbnNpdmU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjb250ZXh0TWVudTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHJlc2l6YWJsZUNvbHVtbnM6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjb2x1bW5SZXNpemVNb2RlOiBzdHJpbmcgPSAnZml0JztcblxuICAgIEBJbnB1dCgpIHJlb3JkZXJhYmxlQ29sdW1uczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBsb2FkaW5nSWNvbjogc3RyaW5nID0gJ3BpIHBpLXNwaW5uZXInO1xuXG4gICAgQElucHV0KCkgc2hvd0xvYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSByb3dIb3ZlcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGN1c3RvbVNvcnQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBhdXRvTGF5b3V0OiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGV4cG9ydEZ1bmN0aW9uO1xuXG4gICAgQElucHV0KCkgc3RhdGVLZXk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN0YXRlU3RvcmFnZTogc3RyaW5nID0gJ3Nlc3Npb24nO1xuXG4gICAgQElucHV0KCkgZWRpdE1vZGU6IHN0cmluZyA9ICdjZWxsJztcblxuICAgIEBPdXRwdXQoKSBvblJvd1NlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Sb3dVbnNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25QYWdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRmlsdGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkxhenlMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblJvd0V4cGFuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Sb3dDb2xsYXBzZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Db250ZXh0TWVudVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Db2xSZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQ29sUmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Sb3dSZW9yZGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkVkaXRJbml0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkVkaXRDb21wbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25FZGl0Q2FuY2VsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkhlYWRlckNoZWNrYm94VG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBzb3J0RnVuY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIGZpcnN0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSByb3dzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblN0YXRlU2F2ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25TdGF0ZVJlc3RvcmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Jlc2l6ZUhlbHBlcicsIHsgc3RhdGljOiBmYWxzZSB9KSByZXNpemVIZWxwZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdyZW9yZGVySW5kaWNhdG9yVXAnLCB7IHN0YXRpYzogZmFsc2UgfSkgcmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgncmVvcmRlckluZGljYXRvckRvd24nLCB7IHN0YXRpYzogZmFsc2UgfSkgcmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCd0YWJsZScsIHsgc3RhdGljOiBmYWxzZSB9KSB0YWJsZVZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT47XG5cbiAgICBfdmFsdWU6IGFueVtdID0gW107XG5cbiAgICBfY29sdW1uczogYW55W107XG5cbiAgICBfdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xuXG4gICAgX2ZpcnN0OiBudW1iZXIgPSAwO1xuXG4gICAgX3Jvd3M6IG51bWJlcjtcblxuICAgIGZpbHRlcmVkVmFsdWU6IGFueVtdO1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBib2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBsb2FkaW5nQm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgY2FwdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZnJvemVuUm93c1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBzdW1tYXJ5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb2xHcm91cFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZXhwYW5kZWRSb3dUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZyb3plbkhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZnJvemVuQm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZnJvemVuRm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBmcm96ZW5Db2xHcm91cFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZW1wdHlNZXNzYWdlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwYWdpbmF0b3JMZWZ0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwYWdpbmF0b3JSaWdodFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgc2VsZWN0aW9uS2V5czogYW55ID0ge307XG5cbiAgICBsYXN0UmVzaXplckhlbHBlclg6IG51bWJlcjtcblxuICAgIHJlb3JkZXJJY29uV2lkdGg6IG51bWJlcjtcblxuICAgIHJlb3JkZXJJY29uSGVpZ2h0OiBudW1iZXI7XG5cbiAgICBkcmFnZ2VkQ29sdW1uOiBhbnk7XG5cbiAgICBkcmFnZ2VkUm93SW5kZXg6IG51bWJlcjtcblxuICAgIGRyb3BwZWRSb3dJbmRleDogbnVtYmVyO1xuXG4gICAgcm93RHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgICBkcm9wUG9zaXRpb246IG51bWJlcjtcblxuICAgIGVkaXRpbmdDZWxsOiBFbGVtZW50O1xuXG4gICAgZWRpdGluZ0NlbGxEYXRhOiBhbnk7XG5cbiAgICBlZGl0aW5nQ2VsbEZpZWxkOiBhbnk7XG5cbiAgICBlZGl0aW5nQ2VsbENsaWNrOiBib29sZWFuO1xuXG4gICAgZG9jdW1lbnRFZGl0TGlzdGVuZXI6IGFueTtcblxuICAgIF9tdWx0aVNvcnRNZXRhOiBTb3J0TWV0YVtdO1xuXG4gICAgX3NvcnRGaWVsZDogc3RyaW5nO1xuXG4gICAgX3NvcnRPcmRlcjogbnVtYmVyID0gMTtcblxuICAgIHZpcnR1YWxTY3JvbGxUaW1lcjogYW55O1xuICAgIFxuICAgIHZpcnR1YWxTY3JvbGxDYWxsYmFjazogRnVuY3Rpb247XG5cbiAgICBwcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb246IGJvb2xlYW47XG5cbiAgICBfc2VsZWN0aW9uOiBhbnk7XG5cbiAgICBhbmNob3JSb3dJbmRleDogbnVtYmVyO1xuICAgIFxuICAgIHJhbmdlUm93SW5kZXg6IG51bWJlcjtcblxuICAgIGZpbHRlclRpbWVvdXQ6IGFueTtcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuXG4gICAgcm93VG91Y2hlZDogYm9vbGVhbjtcblxuICAgIHJlc3RvcmluZ1NvcnQ6IGJvb2xlYW47XG5cbiAgICByZXN0b3JpbmdGaWx0ZXI6IGJvb2xlYW47XG5cbiAgICBzdGF0ZVJlc3RvcmVkOiBib29sZWFuO1xuXG4gICAgY29sdW1uT3JkZXJTdGF0ZVJlc3RvcmVkOiBib29sZWFuO1xuXG4gICAgY29sdW1uV2lkdGhzU3RhdGU6IHN0cmluZztcblxuICAgIHRhYmxlV2lkdGhTdGF0ZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGF6eSAmJiB0aGlzLmxhenlMb2FkT25Jbml0KSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXN0b3JpbmdGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ0ZpbHRlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuIFxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NhcHRpb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcHRpb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2JvZHknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsb2FkaW5nYm9keSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0JvZHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3N1bW1hcnknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1bW1hcnlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb2xncm91cCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sR3JvdXBUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyb3dleHBhbnNpb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkUm93VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVucm93cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuUm93c1RlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zyb3plbmhlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuSGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuYm9keSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuQm9keVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zyb3plbmZvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuRm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuY29sZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb3plbkNvbEdyb3VwVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHltZXNzYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eU1lc3NhZ2VUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwYWdpbmF0b3JsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3JMZWZ0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9ycmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvclJpZ2h0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSAmJiB0aGlzLnJlc2l6YWJsZUNvbHVtbnMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZUNvbHVtbldpZHRocygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSAmJiAhdGhpcy5zdGF0ZVJlc3RvcmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gc2ltcGxlQ2hhbmdlLnZhbHVlLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCF0aGlzLmxhenkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3JkcyA9ICh0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLmxlbmd0aCA6IDApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09ICdzaW5nbGUnICYmIHRoaXMuc29ydEZpZWxkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNvcnRNb2RlID09ICdtdWx0aXBsZScgJiYgdGhpcy5tdWx0aVNvcnRNZXRhKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRNdWx0aXBsZSgpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5oYXNGaWx0ZXIoKSkgICAgICAgLy9zb3J0IGFscmVhZHkgZmlsdGVyc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmKHRoaXMudmlydHVhbFNjcm9sbCAmJiB0aGlzLnZpcnR1YWxTY3JvbGxDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbENhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblZhbHVlQ2hhbmdlKHNpbXBsZUNoYW5nZS52YWx1ZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5jb2x1bW5zKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2x1bW5zID0gc2ltcGxlQ2hhbmdlLmNvbHVtbnMuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Db2x1bW5zQ2hhbmdlKHNpbXBsZUNoYW5nZS5jb2x1bW5zLmN1cnJlbnRWYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2x1bW5zICYmIHRoaXMuaXNTdGF0ZWZ1bCgpICYmIHRoaXMucmVvcmRlcmFibGVDb2x1bW5zICYmICF0aGlzLmNvbHVtbk9yZGVyU3RhdGVSZXN0b3JlZCApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVDb2x1bW5PcmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5zb3J0RmllbGQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvcnRGaWVsZCA9IHNpbXBsZUNoYW5nZS5zb3J0RmllbGQuY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICAvL2F2b2lkIHRyaWdnZXJpbmcgbGF6eSBsb2FkIHByaW9yIHRvIGxhenkgaW5pdGlhbGl6YXRpb24gYXQgb25Jbml0XG4gICAgICAgICAgICBpZiAoICF0aGlzLmxhenkgfHwgdGhpcy5pbml0aWFsaXplZCApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0U2luZ2xlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5zb3J0T3JkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvcnRPcmRlciA9IHNpbXBsZUNoYW5nZS5zb3J0T3JkZXIuY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICAvL2F2b2lkIHRyaWdnZXJpbmcgbGF6eSBsb2FkIHByaW9yIHRvIGxhenkgaW5pdGlhbGl6YXRpb24gYXQgb25Jbml0XG4gICAgICAgICAgICBpZiAoICF0aGlzLmxhenkgfHwgdGhpcy5pbml0aWFsaXplZCApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0U2luZ2xlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5tdWx0aVNvcnRNZXRhKSB7XG4gICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gc2ltcGxlQ2hhbmdlLm11bHRpU29ydE1ldGEuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRNdWx0aXBsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHNpbXBsZUNoYW5nZS5zZWxlY3Rpb24uY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICBpZighdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbktleXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbDogYW55W10pIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWw7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGNvbHVtbnMoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgICB9XG4gICAgc2V0IGNvbHVtbnMoY29sczogYW55W10pIHtcbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IGNvbHM7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGZpcnN0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdDtcbiAgICB9XG4gICAgc2V0IGZpcnN0KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gdmFsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCByb3dzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICAgIH1cbiAgICBzZXQgcm93cyh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9yb3dzID0gdmFsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCB0b3RhbFJlY29yZHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsUmVjb3JkcztcbiAgICB9XG4gICAgc2V0IHRvdGFsUmVjb3Jkcyh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90b3RhbFJlY29yZHMgPSB2YWw7XG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uVG90YWxSZWNvcmRzQ2hhbmdlKHRoaXMuX3RvdGFsUmVjb3Jkcyk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHNvcnRGaWVsZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fc29ydEZpZWxkO1xuICAgIH1cblxuICAgIHNldCBzb3J0RmllbGQodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gdmFsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzb3J0T3JkZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvcnRPcmRlcjtcbiAgICB9XG4gICAgc2V0IHNvcnRPcmRlcih2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSB2YWw7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IG11bHRpU29ydE1ldGEoKTogU29ydE1ldGFbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aVNvcnRNZXRhO1xuICAgIH1cblxuICAgIHNldCBtdWx0aVNvcnRNZXRhKHZhbDogU29ydE1ldGFbXSkge1xuICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gdmFsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzZWxlY3Rpb24oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0aW9uKHZhbDogYW55KSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHZhbDsgICAgICAgIFxuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvbktleXMoKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YUtleSAmJiB0aGlzLl9zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLl9zZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBkYXRhIG9mIHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YSwgdGhpcy5kYXRhS2V5KSldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEodGhpcy5fc2VsZWN0aW9uLCB0aGlzLmRhdGFLZXkpKV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYWdlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZmlyc3QgPSBldmVudC5maXJzdDtcbiAgICAgICAgdGhpcy5yb3dzID0gZXZlbnQucm93cztcblxuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUGFnZS5lbWl0KHtcbiAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuZmlyc3QpO1xuICAgICAgICB0aGlzLnJvd3NDaGFuZ2UuZW1pdCh0aGlzLnJvd3MpO1xuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblZhbHVlQ2hhbmdlKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYW5jaG9yUm93SW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIHNvcnQoZXZlbnQpIHtcbiAgICAgICAgbGV0IG9yaWdpbmFsRXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50O1xuXG4gICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gKHRoaXMuc29ydEZpZWxkID09PSBldmVudC5maWVsZCkgPyB0aGlzLnNvcnRPcmRlciAqIC0xIDogdGhpcy5kZWZhdWx0U29ydE9yZGVyO1xuICAgICAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gZXZlbnQuZmllbGQ7XG4gICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucmVzZXRQYWdlT25Tb3J0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuZmlyc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9IG9yaWdpbmFsRXZlbnQubWV0YUtleSB8fCBvcmlnaW5hbEV2ZW50LmN0cmxLZXk7XG4gICAgICAgICAgICBsZXQgc29ydE1ldGEgPSB0aGlzLmdldFNvcnRNZXRhKGV2ZW50LmZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHNvcnRNZXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX211bHRpU29ydE1ldGEgPSBbeyBmaWVsZDogZXZlbnQuZmllbGQsIG9yZGVyOiBzb3J0TWV0YS5vcmRlciAqIC0xIH1dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzb3J0TWV0YS5vcmRlciA9IHNvcnRNZXRhLm9yZGVyICogLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5IHx8ICF0aGlzLm11bHRpU29ydE1ldGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhLnB1c2goeyBmaWVsZDogZXZlbnQuZmllbGQsIG9yZGVyOiB0aGlzLmRlZmF1bHRTb3J0T3JkZXIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc29ydE11bHRpcGxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuY2hvclJvd0luZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICBzb3J0U2luZ2xlKCkge1xuICAgICAgICBpZih0aGlzLnNvcnRGaWVsZCAmJiB0aGlzLnNvcnRPcmRlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVzdG9yaW5nU29ydCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yaW5nU29ydCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmxhenkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXN0b21Tb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEZ1bmN0aW9uLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IHRoaXMuc29ydE1vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5zb3J0RmllbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogdGhpcy5zb3J0T3JkZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlMSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTEsIHRoaXMuc29ydEZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTIgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGRhdGEyLCB0aGlzLnNvcnRGaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZTEgIT0gbnVsbCAmJiB2YWx1ZTIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZTEgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZTIgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlMS5sb2NhbGVDb21wYXJlKHZhbHVlMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMSA8IHZhbHVlMikgPyAtMSA6ICh2YWx1ZTEgPiB2YWx1ZTIpID8gMSA6IDA7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnNvcnRPcmRlciAqIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhhc0ZpbHRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGxldCBzb3J0TWV0YTogU29ydE1ldGEgPSB7XG4gICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMuc29ydEZpZWxkLFxuICAgICAgICAgICAgICAgIG9yZGVyOiB0aGlzLnNvcnRPcmRlclxuICAgICAgICAgICAgfTtcbiAgICBcbiAgICAgICAgICAgIHRoaXMub25Tb3J0LmVtaXQoc29ydE1ldGEpO1xuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Tb3J0KHNvcnRNZXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNvcnRNdWx0aXBsZSgpIHtcbiAgICAgICAgaWYodGhpcy5tdWx0aVNvcnRNZXRhKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VzdG9tU29ydCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRGdW5jdGlvbi5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiB0aGlzLnNvcnRNb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlTb3J0TWV0YTogdGhpcy5tdWx0aVNvcnRNZXRhXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5zb3J0KChkYXRhMSwgZGF0YTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpc29ydEZpZWxkKGRhdGExLCBkYXRhMiwgdGhpcy5tdWx0aVNvcnRNZXRhLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5oYXNGaWx0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMub25Tb3J0LmVtaXQoe1xuICAgICAgICAgICAgICAgIG11bHRpc29ydG1ldGE6IHRoaXMubXVsdGlTb3J0TWV0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNvcnQodGhpcy5tdWx0aVNvcnRNZXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG11bHRpc29ydEZpZWxkKGRhdGExLCBkYXRhMiwgbXVsdGlTb3J0TWV0YSwgaW5kZXgpIHtcbiAgICAgICAgbGV0IHZhbHVlMSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTEsIG11bHRpU29ydE1ldGFbaW5kZXhdLmZpZWxkKTtcbiAgICAgICAgbGV0IHZhbHVlMiA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTIsIG11bHRpU29ydE1ldGFbaW5kZXhdLmZpZWxkKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKVxuICAgICAgICAgICAgcmVzdWx0ID0gLTE7XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxuICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG4gICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUxID09ICdzdHJpbmcnIHx8IHZhbHVlMSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICAgICAgaWYgKHZhbHVlMS5sb2NhbGVDb21wYXJlICYmICh2YWx1ZTEgIT0gdmFsdWUyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobXVsdGlTb3J0TWV0YVtpbmRleF0ub3JkZXIgKiB2YWx1ZTEubG9jYWxlQ29tcGFyZSh2YWx1ZTIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEgPCB2YWx1ZTIpID8gLTEgOiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlMSA9PSB2YWx1ZTIpIHtcbiAgICAgICAgICAgIHJldHVybiAobXVsdGlTb3J0TWV0YS5sZW5ndGggLSAxKSA+IChpbmRleCkgPyAodGhpcy5tdWx0aXNvcnRGaWVsZChkYXRhMSwgZGF0YTIsIG11bHRpU29ydE1ldGEsIGluZGV4ICsgMSkpIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAobXVsdGlTb3J0TWV0YVtpbmRleF0ub3JkZXIgKiByZXN1bHQpO1xuICAgIH1cblxuICAgIGdldFNvcnRNZXRhKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YSAmJiB0aGlzLm11bHRpU29ydE1ldGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubXVsdGlTb3J0TWV0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpU29ydE1ldGFbaV0uZmllbGQgPT09IGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpU29ydE1ldGFbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlzU29ydGVkKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5zb3J0RmllbGQgJiYgdGhpcy5zb3J0RmllbGQgPT09IGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuc29ydE1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgICAgICAgIGxldCBzb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKHRoaXMubXVsdGlTb3J0TWV0YSnCoHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5tdWx0aVNvcnRNZXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubXVsdGlTb3J0TWV0YVtpXS5maWVsZCA9PSBmaWVsZCnCoHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzb3J0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVSb3dDbGljayhldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gKDxIVE1MRWxlbWVudD4gZXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQpO1xuICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9IHRhcmdldC5ub2RlTmFtZTtcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0YXJnZXQucGFyZW50RWxlbWVudCAmJiB0YXJnZXQucGFyZW50RWxlbWVudC5ub2RlTmFtZTtcbiAgICAgICAgaWYgKHRhcmdldE5vZGUgPT0gJ0lOUFVUJyB8fCB0YXJnZXROb2RlID09ICdCVVRUT04nIHx8IHRhcmdldE5vZGUgPT0gJ0EnIHx8IFxuICAgICAgICAgICAgcGFyZW50Tm9kZSA9PSAnSU5QVVQnIHx8IHBhcmVudE5vZGUgPT0gJ0JVVFRPTicgfHwgcGFyZW50Tm9kZSA9PSAnQScgfHxcbiAgICAgICAgICAgIChEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0LCAndWktY2xpY2thYmxlJykpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnNlbGVjdGlvbk1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSAmJiBldmVudC5vcmlnaW5hbEV2ZW50LnNoaWZ0S2V5ICYmIHRoaXMuYW5jaG9yUm93SW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJhbmdlUm93SW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uUmFuZ2UoZXZlbnQub3JpZ2luYWxFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VSb3dJbmRleCA9IGV2ZW50LnJvd0luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UmFuZ2UoZXZlbnQub3JpZ2luYWxFdmVudCwgZXZlbnQucm93SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvd0RhdGEgPSBldmVudC5yb3dEYXRhO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChyb3dEYXRhKTtcbiAgICAgICAgICAgICAgICBsZXQgbWV0YVNlbGVjdGlvbiA9IHRoaXMucm93VG91Y2hlZCA/IGZhbHNlIDogdGhpcy5tZXRhS2V5U2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBkYXRhS2V5VmFsdWUgPSB0aGlzLmRhdGFLZXkgPyBTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmNob3JSb3dJbmRleCA9IGV2ZW50LnJvd0luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VSb3dJbmRleCA9IGV2ZW50LnJvd0luZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYobWV0YVNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YUtleSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQubWV0YUtleXx8ZXZlbnQub3JpZ2luYWxFdmVudC5jdHJsS2V5O1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0ZWQgJiYgbWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25JbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24ocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsaSkgPT4gaSE9c2VsZWN0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3Jvdyd9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSByb3dEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9ufHxbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb24scm93RGF0YV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3JvdycsIGluZGV4OiBldmVudC5yb3dJbmRleH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gcm93RGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93JywgaW5kZXg6IGV2ZW50LnJvd0luZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsLCBpKSA9PiBpICE9IHNlbGVjdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uID8gWy4uLnRoaXMuc2VsZWN0aW9uLCByb3dEYXRhXSA6IFtyb3dEYXRhXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93JywgaW5kZXg6IGV2ZW50LnJvd0luZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25TZWxlY3Rpb25DaGFuZ2UoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm93VG91Y2hlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZVJvd1RvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucm93VG91Y2hlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaGFuZGxlUm93UmlnaHRDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0TWVudSkge1xuICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IGV2ZW50LnJvd0RhdGE7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHRNZW51U2VsZWN0aW9uTW9kZSA9PT0gJ3NlcGFyYXRlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnVTZWxlY3Rpb24gPSByb3dEYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnVTZWxlY3Rpb25DaGFuZ2UuZW1pdChyb3dEYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29udGV4dE1lbnVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgZGF0YTogcm93RGF0YSwgaW5kZXg6IGV2ZW50LnJvd0luZGV4fSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5zaG93KGV2ZW50Lm9yaWdpbmFsRXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uQ29udGV4dE1lbnUocm93RGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNvbnRleHRNZW51U2VsZWN0aW9uTW9kZSA9PT0gJ2pvaW50Jykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IHRoaXMuZGF0YUtleSA/IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpIDogbnVsbDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHJvd0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbcm93RGF0YV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc2hvdyhldmVudC5vcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29udGV4dE1lbnVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGRhdGE6IHJvd0RhdGEsIGluZGV4OiBldmVudC5yb3dJbmRleH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0UmFuZ2UoZXZlbnQ6IE1vdXNlRXZlbnQsIHJvd0luZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHJhbmdlU3RhcnQsIHJhbmdlRW5kO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5hbmNob3JSb3dJbmRleCA+IHJvd0luZGV4KSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gcm93SW5kZXg7XG4gICAgICAgICAgICByYW5nZUVuZCA9IHRoaXMuYW5jaG9yUm93SW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLmFuY2hvclJvd0luZGV4IDwgcm93SW5kZXgpIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSB0aGlzLmFuY2hvclJvd0luZGV4O1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSByb3dJbmRleDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gcm93SW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmxhenkgJiYgdGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgLT0gdGhpcy5maXJzdDtcbiAgICAgICAgICAgIHJhbmdlRW5kIC09IHRoaXMuZmlyc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGkgPSByYW5nZVN0YXJ0OyBpIDw9IHJhbmdlRW5kOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByYW5nZVJvd0RhdGEgPSB0aGlzLmZpbHRlcmVkVmFsdWUgPyB0aGlzLmZpbHRlcmVkVmFsdWVbaV0gOiB0aGlzLnZhbHVlW2ldO1xuICAgICAgICAgICAgaWYoIXRoaXMuaXNTZWxlY3RlZChyYW5nZVJvd0RhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gWy4uLnRoaXMuc2VsZWN0aW9uLCByYW5nZVJvd0RhdGFdO1xuICAgICAgICAgICAgICAgIGxldCBkYXRhS2V5VmFsdWU6IHN0cmluZyA9IHRoaXMuZGF0YUtleSA/IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJhbmdlUm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIGlmKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGRhdGE6IHJhbmdlUm93RGF0YSwgdHlwZTogJ3Jvdyd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uUmFuZ2UoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IHJhbmdlU3RhcnQsIHJhbmdlRW5kO1xuXG4gICAgICAgIGlmKHRoaXMucmFuZ2VSb3dJbmRleCA+IHRoaXMuYW5jaG9yUm93SW5kZXgpIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSB0aGlzLmFuY2hvclJvd0luZGV4O1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSB0aGlzLnJhbmdlUm93SW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLnJhbmdlUm93SW5kZXggPCB0aGlzLmFuY2hvclJvd0luZGV4KSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gdGhpcy5yYW5nZVJvd0luZGV4O1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSB0aGlzLmFuY2hvclJvd0luZGV4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmFuZ2VTdGFydCA9IHRoaXMucmFuZ2VSb3dJbmRleDtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gdGhpcy5yYW5nZVJvd0luZGV4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGkgPSByYW5nZVN0YXJ0OyBpIDw9IHJhbmdlRW5kOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByYW5nZVJvd0RhdGEgPSB0aGlzLnZhbHVlW2ldO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihyYW5nZVJvd0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsaSkgPT4gaSE9c2VsZWN0aW9uSW5kZXgpO1xuICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZTogc3RyaW5nID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocmFuZ2VSb3dEYXRhLCB0aGlzLmRhdGFLZXkpKSA6IG51bGw7XG4gICAgICAgICAgICBpZihkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGRhdGE6IHJhbmdlUm93RGF0YSwgdHlwZTogJ3Jvdyd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQocm93RGF0YSkge1xuICAgICAgICBpZiAocm93RGF0YSAmJiB0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YUtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbktleXNbT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpXSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGEpID4gLTE7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHMocm93RGF0YSwgdGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGE6IGFueSkge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24gJiYgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXF1YWxzKHJvd0RhdGEsIHRoaXMuc2VsZWN0aW9uW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICB0b2dnbGVSb3dXaXRoUmFkaW8oZXZlbnQ6IGFueSwgcm93RGF0YTphbnkpIHtcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0aW9uICE9IHJvd0RhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHJvd0RhdGE7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgaW5kZXg6IGV2ZW50LnJvd0luZGV4LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncmFkaW9idXR0b24nfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YUtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5vblJvd1Vuc2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGluZGV4OiBldmVudC5yb3dJbmRleCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3JhZGlvYnV0dG9uJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25TZWxlY3Rpb25DaGFuZ2UoKTtcblxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVSb3dXaXRoQ2hlY2tib3goZXZlbnQsIHJvd0RhdGE6IGFueSkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9ufHxbXTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKHJvd0RhdGEpO1xuICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xuICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IHRydWU7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsIGkpID0+IGkgIT0gc2VsZWN0aW9uSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGluZGV4OiBldmVudC5yb3dJbmRleCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ2NoZWNrYm94JyB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbiA/IFsuLi50aGlzLnNlbGVjdGlvbiwgcm93RGF0YV0gOiBbcm93RGF0YV07XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGluZGV4OiBldmVudC5yb3dJbmRleCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ2NoZWNrYm94JyB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVJvd3NXaXRoQ2hlY2tib3goZXZlbnQ6IEV2ZW50LCBjaGVjazogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBjaGVjayA/IHRoaXMuZmlsdGVyZWRWYWx1ZSA/IHRoaXMuZmlsdGVyZWRWYWx1ZS5zbGljZSgpOiB0aGlzLnZhbHVlLnNsaWNlKCkgOiBbXTtcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbktleXMoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLl9zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICB0aGlzLm9uSGVhZGVyQ2hlY2tib3hUb2dnbGUuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGNoZWNrZWQ6IGNoZWNrfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXF1YWxzKGRhdGExLCBkYXRhMikge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlU2VsZWN0aW9uQnkgPT09ICdlcXVhbHMnID8gKGRhdGExID09PSBkYXRhMikgOiBPYmplY3RVdGlscy5lcXVhbHMoZGF0YTEsIGRhdGEyLCB0aGlzLmRhdGFLZXkpO1xuICAgIH1cblxuICAgIGZpbHRlcih2YWx1ZSwgZmllbGQsIG1hdGNoTW9kZSkge1xuICAgICAgICBpZih0aGlzLmZpbHRlclRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZpbHRlclRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMuaXNGaWx0ZXJCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyc1tmaWVsZF0gPSB7IHZhbHVlOiB2YWx1ZSwgbWF0Y2hNb2RlOiBtYXRjaE1vZGUgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZpbHRlcnNbZmllbGRdKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5maWx0ZXJzW2ZpZWxkXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5maWx0ZXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVGltZW91dCA9IG51bGw7XG4gICAgICAgIH0sIHRoaXMuZmlsdGVyRGVsYXkpO1xuXG4gICAgICAgIHRoaXMuYW5jaG9yUm93SW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIGZpbHRlckdsb2JhbCh2YWx1ZSwgbWF0Y2hNb2RlKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyKHZhbHVlLCAnZ2xvYmFsJywgbWF0Y2hNb2RlKTtcbiAgICB9XG5cbiAgICBpc0ZpbHRlckJsYW5rKGZpbHRlcjogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaWx0ZXIgIT09IG51bGwgJiYgZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICgodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycgJiYgZmlsdGVyLnRyaW0oKS5sZW5ndGggPT0gMCkgfHwgKGZpbHRlciBpbnN0YW5jZW9mIEFycmF5ICYmIGZpbHRlci5sZW5ndGggPT0gMCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9maWx0ZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5yZXN0b3JpbmdGaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSAwO1xuICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuZmlyc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighdGhpcy5oYXNGaWx0ZXIoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gdGhpcy52YWx1ZSA/IHRoaXMudmFsdWUubGVuZ3RoIDogMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbHVtbnMgJiYgIXRoaXMuZ2xvYmFsRmlsdGVyRmllbGRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHbG9iYWwgZmlsdGVyaW5nIHJlcXVpcmVzIGR5bmFtaWMgY29sdW1ucyBvciBnbG9iYWxGaWx0ZXJGaWVsZHMgdG8gYmUgZGVmaW5lZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXkgPSB0aGlzLmdsb2JhbEZpbHRlckZpZWxkc3x8dGhpcy5jb2x1bW5zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBnbG9iYWxNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxGaWx0ZXJlZCA9IGZhbHNlO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHRoaXMuZmlsdGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVycy5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBwcm9wICE9PSAnZ2xvYmFsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsRmlsdGVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJNZXRhID0gdGhpcy5maWx0ZXJzW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJGaWVsZCA9IHByb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlclZhbHVlID0gZmlsdGVyTWV0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyTWF0Y2hNb2RlID0gZmlsdGVyTWV0YS5tYXRjaE1vZGUgfHwgJ3N0YXJ0c1dpdGgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRmllbGRWYWx1ZSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEodGhpcy52YWx1ZVtpXSwgZmlsdGVyRmllbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJDb25zdHJhaW50ID0gRmlsdGVyVXRpbHNbZmlsdGVyTWF0Y2hNb2RlXTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbHRlckNvbnN0cmFpbnQoZGF0YUZpZWxkVmFsdWUsIGZpbHRlclZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbE1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbG9jYWxNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10gJiYgIWdsb2JhbE1hdGNoICYmIGdsb2JhbEZpbHRlckZpZWxkc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ2xvYmFsRmlsdGVyRmllbGQgPSBnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheVtqXS5maWVsZHx8Z2xvYmFsRmlsdGVyRmllbGRzQXJyYXlbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTWF0Y2ggPSBGaWx0ZXJVdGlsc1t0aGlzLmZpbHRlcnNbJ2dsb2JhbCddLm1hdGNoTW9kZV0oT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YSh0aGlzLnZhbHVlW2ldLCBnbG9iYWxGaWx0ZXJGaWVsZCksIHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGdsb2JhbE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0Y2hlczogYm9vbGVhbjtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5maWx0ZXJzWydnbG9iYWwnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IGxvY2FsRmlsdGVyZWQgPyAobG9jYWxGaWx0ZXJlZCAmJiBsb2NhbE1hdGNoICYmIGdsb2JhbE1hdGNoKSA6IGdsb2JhbE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IGxvY2FsRmlsdGVyZWQgJiYgbG9jYWxNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlLnB1c2godGhpcy52YWx1ZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyZWRWYWx1ZS5sZW5ndGggPT09IHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3JkcyA9IHRoaXMuZmlsdGVyZWRWYWx1ZSA/IHRoaXMuZmlsdGVyZWRWYWx1ZS5sZW5ndGggOiB0aGlzLnZhbHVlID8gdGhpcy52YWx1ZS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25GaWx0ZXIuZW1pdCh7XG4gICAgICAgICAgICBmaWx0ZXJzOiB0aGlzLmZpbHRlcnMsXG4gICAgICAgICAgICBmaWx0ZXJlZFZhbHVlOiB0aGlzLmZpbHRlcmVkVmFsdWUgfHwgdGhpcy52YWx1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblZhbHVlQ2hhbmdlKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSAmJiAhdGhpcy5yZXN0b3JpbmdGaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXN0b3JpbmdGaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yaW5nRmlsdGVyID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBoYXNGaWx0ZXIoKSB7XG4gICAgICAgIGxldCBlbXB0eSA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5maWx0ZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgZW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhZW1wdHk7XG4gICAgfVxuXG4gICAgY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpOiBhbnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICByb3dzOiB0aGlzLnZpcnR1YWxTY3JvbGwgPyB0aGlzLnJvd3MgKiAyOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICBzb3J0RmllbGQ6IHRoaXMuc29ydEZpZWxkLFxuICAgICAgICAgICAgc29ydE9yZGVyOiB0aGlzLnNvcnRPcmRlcixcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZmlsdGVycyxcbiAgICAgICAgICAgIGdsb2JhbEZpbHRlcjogdGhpcy5maWx0ZXJzICYmIHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10gPyB0aGlzLmZpbHRlcnNbJ2dsb2JhbCddLnZhbHVlIDogbnVsbCxcbiAgICAgICAgICAgIG11bHRpU29ydE1ldGE6IHRoaXMubXVsdGlTb3J0TWV0YVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldCgpIHtcbiAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gdGhpcy5kZWZhdWx0U29ydE9yZGVyO1xuICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Tb3J0KG51bGwpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5maWx0ZXJzID0ge307XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZpcnN0ID0gMDtcbiAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuZmlyc3QpO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3JkcyA9ICh0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLmxlbmd0aCA6IDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGV4cG9ydENTVihvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5maWx0ZXJlZFZhbHVlIHx8IHRoaXMudmFsdWU7XG4gICAgICAgIGxldCBjc3YgPSAnJztcblxuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNlbGVjdGlvbk9ubHkpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnNlbGVjdGlvbiB8fCBbXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9oZWFkZXJzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gdGhpcy5jb2x1bW5zW2ldO1xuICAgICAgICAgICAgaWYgKGNvbHVtbi5leHBvcnRhYmxlICE9PSBmYWxzZSAmJiBjb2x1bW4uZmllbGQpIHtcbiAgICAgICAgICAgICAgICBjc3YgKz0gJ1wiJyArIChjb2x1bW4uaGVhZGVyIHx8IGNvbHVtbi5maWVsZCkgKyAnXCInO1xuXG4gICAgICAgICAgICAgICAgaWYgKGkgPCAodGhpcy5jb2x1bW5zLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzdiArPSB0aGlzLmNzdlNlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2JvZHlcbiAgICAgICAgZGF0YS5mb3JFYWNoKChyZWNvcmQsIGkpID0+IHtcbiAgICAgICAgICAgIGNzdiArPSAnXFxuJztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbiA9IHRoaXMuY29sdW1uc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uLmV4cG9ydGFibGUgIT09IGZhbHNlICYmIGNvbHVtbi5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERhdGEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJlY29yZCwgY29sdW1uLmZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5leHBvcnRGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxEYXRhID0gdGhpcy5leHBvcnRGdW5jdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGNlbGxEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogY29sdW1uLmZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbERhdGEgPSBTdHJpbmcoY2VsbERhdGEpLnJlcGxhY2UoL1wiL2csICdcIlwiJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbERhdGEgPSAnJztcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjc3YgKz0gJ1wiJyArIGNlbGxEYXRhICsgJ1wiJztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgKHRoaXMuY29sdW1ucy5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3N2ICs9IHRoaXMuY3N2U2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtjc3ZdLCB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dC9jc3Y7Y2hhcnNldD11dGYtODsnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIHRoaXMuZXhwb3J0RmlsZW5hbWUgKyAnLmNzdicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgICAgICBpZiAobGluay5kb3dubG9hZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKTtcbiAgICAgICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCB0aGlzLmV4cG9ydEZpbGVuYW1lICsgJy5jc3YnKTtcbiAgICAgICAgICAgICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjc3YgPSAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LCcgKyBjc3Y7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oZW5jb2RlVVJJKGNzdikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUVkaXRpbmdDZWxsKGNlbGwsIGRhdGEsIGZpZWxkKSB7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGwgPSBjZWxsO1xuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGxGaWVsZCA9IGZpZWxkO1xuICAgICAgICB0aGlzLmJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIGlzRWRpdGluZ0NlbGxWYWxpZCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmVkaXRpbmdDZWxsICYmIERvbUhhbmRsZXIuZmluZCh0aGlzLmVkaXRpbmdDZWxsLCAnLm5nLWludmFsaWQubmctZGlydHknKS5sZW5ndGggPT09IDApO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdGluZ0NlbGwgJiYgIXRoaXMuZWRpdGluZ0NlbGxDbGljayAmJiB0aGlzLmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5lZGl0aW5nQ2VsbCwgJ3VpLWVkaXRpbmctY2VsbCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVkaXRDb21wbGV0ZS5lbWl0KHsgZmllbGQ6IHRoaXMuZWRpdGluZ0NlbGxGaWVsZCwgZGF0YTogdGhpcy5lZGl0aW5nQ2VsbERhdGEsIG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRmllbGQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRGF0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRFZGl0TGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgIFxuICAgIHVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRFZGl0TGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdFJvd0VkaXQocm93RGF0YTogYW55KSB7XG4gICAgICAgIGxldCBkYXRhS2V5VmFsdWUgPSBTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKTtcbiAgICAgICAgdGhpcy5lZGl0aW5nUm93S2V5c1tkYXRhS2V5VmFsdWVdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzYXZlUm93RWRpdChyb3dEYXRhOiBhbnksIHJvd0VsZW1lbnQ6IEhUTUxUYWJsZVJvd0VsZW1lbnQpIHtcbiAgICAgICAgaWYgKERvbUhhbmRsZXIuZmluZChyb3dFbGVtZW50LCAnLm5nLWludmFsaWQubmctZGlydHknKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCBkYXRhS2V5VmFsdWUgPSBTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmVkaXRpbmdSb3dLZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5jZWxSb3dFZGl0KHJvd0RhdGE6IGFueSkge1xuICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmVkaXRpbmdSb3dLZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgfVxuXG4gICAgdG9nZ2xlUm93KHJvd0RhdGE6IGFueSwgZXZlbnQ/OiBFdmVudCkge1xuICAgICAgICBpZighdGhpcy5kYXRhS2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGFLZXkgbXVzdCBiZSBkZWZpbmVkIHRvIHVzZSByb3cgZXhwYW5zaW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWRSb3dLZXlzW2RhdGFLZXlWYWx1ZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZXhwYW5kZWRSb3dLZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgICAgICAgICB0aGlzLm9uUm93Q29sbGFwc2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgZGF0YTogcm93RGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb3dFeHBhbmRNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRSb3dLZXlzID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRSb3dLZXlzW2RhdGFLZXlWYWx1ZV0gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vblJvd0V4cGFuZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBkYXRhOiByb3dEYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzUm93RXhwYW5kZWQocm93RGF0YTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkUm93S2V5c1tTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKV0gPT09IHRydWU7XG4gICAgfVxuXG4gICAgaXNSb3dFZGl0aW5nKHJvd0RhdGE6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0aW5nUm93S2V5c1tTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKV0gPT09IHRydWU7XG4gICAgfVxuXG4gICAgaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJztcbiAgICB9XG5cbiAgICBpc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpcGxlJztcbiAgICB9XG5cbiAgICBvbkNvbHVtblJlc2l6ZUJlZ2luKGV2ZW50KSB7XG4gICAgICAgIGxldCBjb250YWluZXJMZWZ0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkubGVmdDtcbiAgICAgICAgdGhpcy5sYXN0UmVzaXplckhlbHBlclggPSAoZXZlbnQucGFnZVggLSBjb250YWluZXJMZWZ0ICsgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkNvbHVtblJlc2l6ZShldmVudCkge1xuICAgICAgICBsZXQgY29udGFpbmVyTGVmdCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpLmxlZnQ7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXVuc2VsZWN0YWJsZS10ZXh0Jyk7XG4gICAgICAgIHRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICB0aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IDAgKyAncHgnO1xuICAgICAgICB0aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAoZXZlbnQucGFnZVggLSBjb250YWluZXJMZWZ0ICsgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0KSArICdweCc7XG5cbiAgICAgICAgdGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBvbkNvbHVtblJlc2l6ZUVuZChldmVudCwgY29sdW1uKSB7XG4gICAgICAgIGxldCBkZWx0YSA9IHRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCAtIHRoaXMubGFzdFJlc2l6ZXJIZWxwZXJYO1xuICAgICAgICBsZXQgY29sdW1uV2lkdGggPSBjb2x1bW4ub2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBtaW5XaWR0aCA9IHBhcnNlSW50KGNvbHVtbi5zdHlsZS5taW5XaWR0aCB8fCAxNSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoY29sdW1uV2lkdGggKyBkZWx0YSA8IG1pbldpZHRoKSB7XG4gICAgICAgICAgICBkZWx0YSA9IG1pbldpZHRoIC0gY29sdW1uV2lkdGg7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uc3QgbmV3Q29sdW1uV2lkdGggPSBjb2x1bW5XaWR0aCArIGRlbHRhO1xuICAgIFxuICAgICAgICBpZiAobmV3Q29sdW1uV2lkdGggPj0gbWluV2lkdGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbHVtblJlc2l6ZU1vZGUgPT09ICdmaXQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDb2x1bW4gPSBjb2x1bW4ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIHdoaWxlICghbmV4dENvbHVtbi5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENvbHVtbiA9IG5leHRDb2x1bW4ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXh0Q29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sdW1uV2lkdGggPSBuZXh0Q29sdW1uLm9mZnNldFdpZHRoIC0gZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sdW1uTWluV2lkdGggPSBuZXh0Q29sdW1uLnN0eWxlLm1pbldpZHRoIHx8IDE1O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdDb2x1bW5XaWR0aCA+IDE1ICYmIG5leHRDb2x1bW5XaWR0aCA+IHBhcnNlSW50KG5leHRDb2x1bW5NaW5XaWR0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsYWJsZVZpZXcgPSB0aGlzLmZpbmRQYXJlbnRTY3JvbGxhYmxlVmlldyhjb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxhYmxlQm9keVRhYmxlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAndGFibGUudWktdGFibGUtc2Nyb2xsYWJsZS1ib2R5LXRhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbGFibGVIZWFkZXJUYWJsZSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShzY3JvbGxhYmxlVmlldywgJ3RhYmxlLnVpLXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLXRhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbGFibGVGb290ZXJUYWJsZSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShzY3JvbGxhYmxlVmlldywgJ3RhYmxlLnVpLXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyLXRhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc2l6ZUNvbHVtbkluZGV4ID0gRG9tSGFuZGxlci5pbmRleChjb2x1bW4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVDb2xHcm91cChzY3JvbGxhYmxlSGVhZGVyVGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbmV4dENvbHVtbldpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUNvbEdyb3VwKHNjcm9sbGFibGVCb2R5VGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbmV4dENvbHVtbldpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUNvbEdyb3VwKHNjcm9sbGFibGVGb290ZXJUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBuZXh0Q29sdW1uV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLnN0eWxlLndpZHRoID0gbmV3Q29sdW1uV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Q29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRDb2x1bW4uc3R5bGUud2lkdGggPSBuZXh0Q29sdW1uV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY29sdW1uUmVzaXplTW9kZSA9PT0gJ2V4cGFuZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3Q29sdW1uV2lkdGggPiBtaW5XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNjcm9sbGFibGVJdGVtc1dpZHRoT25FeHBhbmRSZXNpemUoY29sdW1uLCBuZXdDb2x1bW5XaWR0aCwgZGVsdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoICsgZGVsdGEgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLnN0eWxlLndpZHRoID0gbmV3Q29sdW1uV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IGNvbnRhaW5lcldpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbkNvbFJlc2l6ZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBjb2x1bW4sXG4gICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktdW5zZWxlY3RhYmxlLXRleHQnKTtcbiAgICB9XG5cbiAgICBzZXRTY3JvbGxhYmxlSXRlbXNXaWR0aE9uRXhwYW5kUmVzaXplKGNvbHVtbiwgbmV3Q29sdW1uV2lkdGgsIGRlbHRhKSB7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlVmlldyA9IGNvbHVtbiA/IHRoaXMuZmluZFBhcmVudFNjcm9sbGFibGVWaWV3KGNvbHVtbikgOiB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgc2Nyb2xsYWJsZUJvZHkgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZVZpZXcsICcudWktdGFibGUtc2Nyb2xsYWJsZS1ib2R5Jyk7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlSGVhZGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAnLnVpLXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyJyk7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlRm9vdGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAnLnVpLXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyJyk7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlQm9keVRhYmxlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVCb2R5LCAndGFibGUudWktdGFibGUtc2Nyb2xsYWJsZS1ib2R5LXRhYmxlJyk7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlSGVhZGVyVGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZUhlYWRlciwgJ3RhYmxlLnVpLXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLXRhYmxlJyk7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlRm9vdGVyVGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZUZvb3RlciwgJ3RhYmxlLnVpLXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyLXRhYmxlJyk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsYWJsZUJvZHlUYWJsZVdpZHRoID0gY29sdW1uID8gc2Nyb2xsYWJsZUJvZHlUYWJsZS5vZmZzZXRXaWR0aCArIGRlbHRhIDogbmV3Q29sdW1uV2lkdGg7XG4gICAgICAgIGNvbnN0IHNjcm9sbGFibGVIZWFkZXJUYWJsZVdpZHRoID0gY29sdW1uID8gc2Nyb2xsYWJsZUhlYWRlclRhYmxlLm9mZnNldFdpZHRoICsgZGVsdGEgOiBuZXdDb2x1bW5XaWR0aDtcbiAgICAgICAgY29uc3QgaXNDb250YWluZXJJblZpZXdwb3J0ID0gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA+PSBzY3JvbGxhYmxlQm9keVRhYmxlV2lkdGg7XG5cbiAgICAgICAgbGV0IHNldFdpZHRoID0gKGNvbnRhaW5lciwgdGFibGUsIHdpZHRoLCBpc0NvbnRhaW5lckluVmlld3BvcnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIgJiYgdGFibGUpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSBpc0NvbnRhaW5lckluVmlld3BvcnQgPyB3aWR0aCArIERvbUhhbmRsZXIuY2FsY3VsYXRlU2Nyb2xsYmFyV2lkdGgoc2Nyb2xsYWJsZUJvZHkpICsgJ3B4JyA6ICdhdXRvJ1xuICAgICAgICAgICAgICAgIHRhYmxlLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNldFdpZHRoKHNjcm9sbGFibGVCb2R5LCBzY3JvbGxhYmxlQm9keVRhYmxlLCBzY3JvbGxhYmxlQm9keVRhYmxlV2lkdGgsIGlzQ29udGFpbmVySW5WaWV3cG9ydCk7XG4gICAgICAgIHNldFdpZHRoKHNjcm9sbGFibGVIZWFkZXIsIHNjcm9sbGFibGVIZWFkZXJUYWJsZSwgc2Nyb2xsYWJsZUhlYWRlclRhYmxlV2lkdGgsIGlzQ29udGFpbmVySW5WaWV3cG9ydCk7XG4gICAgICAgIHNldFdpZHRoKHNjcm9sbGFibGVGb290ZXIsIHNjcm9sbGFibGVGb290ZXJUYWJsZSwgc2Nyb2xsYWJsZUhlYWRlclRhYmxlV2lkdGgsIGlzQ29udGFpbmVySW5WaWV3cG9ydCk7XG4gICAgXG4gICAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgICAgIGxldCByZXNpemVDb2x1bW5JbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY29sdW1uKTtcblxuICAgICAgICAgICAgdGhpcy5yZXNpemVDb2xHcm91cChzY3JvbGxhYmxlSGVhZGVyVGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbnVsbCk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUNvbEdyb3VwKHNjcm9sbGFibGVCb2R5VGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbnVsbCk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUNvbEdyb3VwKHNjcm9sbGFibGVGb290ZXJUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRQYXJlbnRTY3JvbGxhYmxlVmlldyhjb2x1bW4pIHtcbiAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGNvbHVtbi5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAhRG9tSGFuZGxlci5oYXNDbGFzcyhwYXJlbnQsICd1aS10YWJsZS1zY3JvbGxhYmxlLXZpZXcnKSkge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNpemVDb2xHcm91cCh0YWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBuZXh0Q29sdW1uV2lkdGgpIHtcbiAgICAgICAgaWYodGFibGUpIHtcbiAgICAgICAgICAgIGxldCBjb2xHcm91cCA9IHRhYmxlLmNoaWxkcmVuWzBdLm5vZGVOYW1lID09PSAnQ09MR1JPVVAnID8gdGFibGUuY2hpbGRyZW5bMF0gOiBudWxsO1xuXG4gICAgICAgICAgICBpZihjb2xHcm91cCkge1xuICAgICAgICAgICAgICAgIGxldCBjb2wgPSBjb2xHcm91cC5jaGlsZHJlbltyZXNpemVDb2x1bW5JbmRleF07XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDb2wgPSBjb2wubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbC5zdHlsZS53aWR0aCA9IG5ld0NvbHVtbldpZHRoICsgJ3B4JztcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAobmV4dENvbCAmJiBuZXh0Q29sdW1uV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENvbC5zdHlsZS53aWR0aCA9IG5leHRDb2x1bW5XaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJTY3JvbGxhYmxlIHRhYmxlcyByZXF1aXJlIGEgY29sZ3JvdXAgdG8gc3VwcG9ydCByZXNpemFibGUgY29sdW1uc1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db2x1bW5EcmFnU3RhcnQoZXZlbnQsIGNvbHVtbkVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5yZW9yZGVySWNvbldpZHRoID0gRG9tSGFuZGxlci5nZXRIaWRkZW5FbGVtZW50T3V0ZXJXaWR0aCh0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5yZW9yZGVySWNvbkhlaWdodCA9IERvbUhhbmRsZXIuZ2V0SGlkZGVuRWxlbWVudE91dGVySGVpZ2h0KHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuZHJhZ2dlZENvbHVtbiA9IGNvbHVtbkVsZW1lbnQ7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ2InKTsgICAgLy8gRm9yIGZpcmVmb3hcbiAgICB9XG5cbiAgICBvbkNvbHVtbkRyYWdFbnRlcihldmVudCwgZHJvcEhlYWRlcikge1xuICAgICAgICBpZiAodGhpcy5yZW9yZGVyYWJsZUNvbHVtbnMgJiYgdGhpcy5kcmFnZ2VkQ29sdW1uICYmIGRyb3BIZWFkZXIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyT2Zmc2V0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgZHJvcEhlYWRlck9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KGRyb3BIZWFkZXIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2VkQ29sdW1uICE9IGRyb3BIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZHJhZ0luZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKHRoaXMuZHJhZ2dlZENvbHVtbiwgJ3ByZW9yZGVyYWJsZWNvbHVtbicpO1xuICAgICAgICAgICAgICAgIGxldCBkcm9wSW5kZXggPSBEb21IYW5kbGVyLmluZGV4V2l0aGluR3JvdXAoZHJvcEhlYWRlciwgJ3ByZW9yZGVyYWJsZWNvbHVtbicpO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRMZWZ0ID0gZHJvcEhlYWRlck9mZnNldC5sZWZ0IC0gY29udGFpbmVyT2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFRvcCA9IGNvbnRhaW5lck9mZnNldC50b3AgLSBkcm9wSGVhZGVyT2Zmc2V0LnRvcDtcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uQ2VudGVyID0gZHJvcEhlYWRlck9mZnNldC5sZWZ0ICsgZHJvcEhlYWRlci5vZmZzZXRXaWR0aCAvIDI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IGRyb3BIZWFkZXJPZmZzZXQudG9wIC0gY29udGFpbmVyT2Zmc2V0LnRvcCAtICh0aGlzLnJlb3JkZXJJY29uSGVpZ2h0IC0gMSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBkcm9wSGVhZGVyT2Zmc2V0LnRvcCAtIGNvbnRhaW5lck9mZnNldC50b3AgKyBkcm9wSGVhZGVyLm9mZnNldEhlaWdodCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQucGFnZVggPiBjb2x1bW5DZW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKHRhcmdldExlZnQgKyBkcm9wSGVhZGVyLm9mZnNldFdpZHRoIC0gTWF0aC5jZWlsKHRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKHRhcmdldExlZnQgKyBkcm9wSGVhZGVyLm9mZnNldFdpZHRoIC0gTWF0aC5jZWlsKHRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc2l0aW9uID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICh0YXJnZXRMZWZ0IC0gTWF0aC5jZWlsKHRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKHRhcmdldExlZnQgLSBNYXRoLmNlaWwodGhpcy5yZW9yZGVySWNvbldpZHRoIC8gMikpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zaXRpb24gPSAtMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZigoZHJvcEluZGV4IC0gZHJhZ0luZGV4ID09PSAxICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAtMSkgfHwgKGRyb3BJbmRleCAtIGRyYWdJbmRleCA9PT0gLTEgJiYgdGhpcy5kcm9wUG9zaXRpb24gPT09IDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbHVtbkRyYWdMZWF2ZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZW9yZGVyYWJsZUNvbHVtbnMgJiYgdGhpcy5kcmFnZ2VkQ29sdW1uKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbHVtbkRyb3AoZXZlbnQsIGRyb3BDb2x1bW4pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dlZENvbHVtbikge1xuICAgICAgICAgICAgbGV0IGRyYWdJbmRleCA9IERvbUhhbmRsZXIuaW5kZXhXaXRoaW5Hcm91cCh0aGlzLmRyYWdnZWRDb2x1bW4sICdwcmVvcmRlcmFibGVjb2x1bW4nKTtcbiAgICAgICAgICAgIGxldCBkcm9wSW5kZXggPSBEb21IYW5kbGVyLmluZGV4V2l0aGluR3JvdXAoZHJvcENvbHVtbiwgJ3ByZW9yZGVyYWJsZWNvbHVtbicpO1xuICAgICAgICAgICAgbGV0IGFsbG93RHJvcCA9IChkcmFnSW5kZXggIT0gZHJvcEluZGV4KTtcbiAgICAgICAgICAgIGlmIChhbGxvd0Ryb3AgJiYgKChkcm9wSW5kZXggLSBkcmFnSW5kZXggPT0gMSAmJiB0aGlzLmRyb3BQb3NpdGlvbiA9PT0gLTEpIHx8IChkcmFnSW5kZXggLSBkcm9wSW5kZXggPT0gMSAmJiB0aGlzLmRyb3BQb3NpdGlvbiA9PT0gMSkpKSB7XG4gICAgICAgICAgICAgICAgYWxsb3dEcm9wID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbGxvd0Ryb3AgJiYgKChkcm9wSW5kZXggPCBkcmFnSW5kZXggJiYgdGhpcy5kcm9wUG9zaXRpb24gPT09IDEpKSkge1xuICAgICAgICAgICAgICAgIGRyb3BJbmRleCA9IGRyb3BJbmRleCArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbGxvd0Ryb3AgJiYgKChkcm9wSW5kZXggPiBkcmFnSW5kZXggJiYgdGhpcy5kcm9wUG9zaXRpb24gPT09IC0xKSkpIHtcbiAgICAgICAgICAgICAgICBkcm9wSW5kZXggPSBkcm9wSW5kZXggLSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0VXRpbHMucmVvcmRlckFycmF5KHRoaXMuY29sdW1ucywgZHJhZ0luZGV4LCBkcm9wSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbFJlb3JkZXIuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdJbmRleDogZHJhZ0luZGV4LFxuICAgICAgICAgICAgICAgICAgICBkcm9wSW5kZXg6IGRyb3BJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jb2x1bW5zXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2VkQ29sdW1uLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2VkQ29sdW1uID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZHJvcFBvc2l0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUm93RHJhZ1N0YXJ0KGV2ZW50LCBpbmRleCkge1xuICAgICAgICB0aGlzLnJvd0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmFnZ2VkUm93SW5kZXggPSBpbmRleDtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCAnYicpOyAgICAvLyBGb3IgZmlyZWZveFxuICAgIH1cblxuICAgIG9uUm93RHJhZ092ZXIoZXZlbnQsIGluZGV4LCByb3dFbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJvd0RyYWdnaW5nICYmIHRoaXMuZHJhZ2dlZFJvd0luZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgbGV0IHJvd1kgPSBEb21IYW5kbGVyLmdldE9mZnNldChyb3dFbGVtZW50KS50b3AgKyBEb21IYW5kbGVyLmdldFdpbmRvd1Njcm9sbFRvcCgpO1xuICAgICAgICAgICAgbGV0IHBhZ2VZID0gZXZlbnQucGFnZVk7XG4gICAgICAgICAgICBsZXQgcm93TWlkWSA9IHJvd1kgKyBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHJvd0VsZW1lbnQpIC8gMjtcbiAgICAgICAgICAgIGxldCBwcmV2Um93RWxlbWVudCA9IHJvd0VsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHBhZ2VZIDwgcm93TWlkWSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3Mocm93RWxlbWVudCwgJ3VpLXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BwZWRSb3dJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChwcmV2Um93RWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhwcmV2Um93RWxlbWVudCwgJ3VpLXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3Mocm93RWxlbWVudCwgJ3VpLXRhYmxlLWRyYWdwb2ludC10b3AnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2Um93RWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhwcmV2Um93RWxlbWVudCwgJ3VpLXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3Mocm93RWxlbWVudCwgJ3VpLXRhYmxlLWRyYWdwb2ludC10b3AnKTtcbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BwZWRSb3dJbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHJvd0VsZW1lbnQsICd1aS10YWJsZS1kcmFncG9pbnQtYm90dG9tJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJvd0RyYWdMZWF2ZShldmVudCwgcm93RWxlbWVudCkge1xuICAgICAgICBsZXQgcHJldlJvd0VsZW1lbnQgPSByb3dFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGlmIChwcmV2Um93RWxlbWVudCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhwcmV2Um93RWxlbWVudCwgJ3VpLXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3Mocm93RWxlbWVudCwgJ3VpLXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhyb3dFbGVtZW50LCAndWktdGFibGUtZHJhZ3BvaW50LXRvcCcpO1xuICAgIH1cblxuICAgIG9uUm93RHJhZ0VuZChldmVudCkge1xuICAgICAgICB0aGlzLnJvd0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2dlZFJvd0luZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5kcm9wcGVkUm93SW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIG9uUm93RHJvcChldmVudCwgcm93RWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5kcm9wcGVkUm93SW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IGRyb3BJbmRleCA9ICh0aGlzLmRyYWdnZWRSb3dJbmRleCA+IHRoaXMuZHJvcHBlZFJvd0luZGV4KSA/IHRoaXMuZHJvcHBlZFJvd0luZGV4IDogKHRoaXMuZHJvcHBlZFJvd0luZGV4ID09PSAwKSA/IDAgOiB0aGlzLmRyb3BwZWRSb3dJbmRleCAtIDE7XG4gICAgICAgICAgICBPYmplY3RVdGlscy5yZW9yZGVyQXJyYXkodGhpcy52YWx1ZSwgdGhpcy5kcmFnZ2VkUm93SW5kZXgsIGRyb3BJbmRleCk7XG5cbiAgICAgICAgICAgIHRoaXMub25Sb3dSZW9yZGVyLmVtaXQoe1xuICAgICAgICAgICAgICAgIGRyYWdJbmRleDogdGhpcy5kcmFnZ2VkUm93SW5kZXgsXG4gICAgICAgICAgICAgICAgZHJvcEluZGV4OiBkcm9wSW5kZXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vY2xlYW51cFxuICAgICAgICB0aGlzLm9uUm93RHJhZ0xlYXZlKGV2ZW50LCByb3dFbGVtZW50KTtcbiAgICAgICAgdGhpcy5vblJvd0RyYWdFbmQoZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZVZpcnR1YWxTY3JvbGwoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5maXJzdCA9IChldmVudC5wYWdlIC0gMSkgKiB0aGlzLnJvd3M7XG4gICAgICAgIHRoaXMuZmlyc3RDaGFuZ2UuZW1pdCh0aGlzLmZpcnN0KTtcbiAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsQ2FsbGJhY2sgPSBldmVudC5jYWxsYmFjaztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYodGhpcy52aXJ0dWFsU2Nyb2xsVGltZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy52aXJ0dWFsU2Nyb2xsVGltZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgICAgIH0sIHRoaXMudmlydHVhbFNjcm9sbERlbGF5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmZpbHRlcmVkVmFsdWV8fHRoaXMudmFsdWU7XG4gICAgICAgIHJldHVybiBkYXRhID09IG51bGwgfHwgZGF0YS5sZW5ndGggPT0gMDtcbiAgICB9XG5cbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgZ2V0U3RvcmFnZSgpIHtcbiAgICAgICAgc3dpdGNoKHRoaXMuc3RhdGVTdG9yYWdlKSB7XG4gICAgICAgICAgICBjYXNlICdsb2NhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Nlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2U7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuc3RhdGVTdG9yYWdlICsgJyBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdGhlIHN0YXRlIHN0b3JhZ2UsIHN1cHBvcnRlZCB2YWx1ZXMgYXJlIFwibG9jYWxcIiBhbmQgXCJzZXNzaW9uXCIuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1N0YXRlZnVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZUtleSAhPSBudWxsO1xuICAgIH1cblxuICAgIHNhdmVTdGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpO1xuICAgICAgICBsZXQgc3RhdGU6IFRhYmxlU3RhdGUgPSB7fTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgc3RhdGUuZmlyc3QgPSB0aGlzLmZpcnN0O1xuICAgICAgICAgICAgc3RhdGUucm93cyA9IHRoaXMucm93cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNvcnRGaWVsZCkge1xuICAgICAgICAgICAgc3RhdGUuc29ydEZpZWxkID0gdGhpcy5zb3J0RmllbGQ7XG4gICAgICAgICAgICBzdGF0ZS5zb3J0T3JkZXIgPSB0aGlzLnNvcnRPcmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpU29ydE1ldGEpIHtcbiAgICAgICAgICAgIHN0YXRlLm11bHRpU29ydE1ldGEgPSB0aGlzLm11bHRpU29ydE1ldGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXIoKSkge1xuICAgICAgICAgICAgc3RhdGUuZmlsdGVycyA9IHRoaXMuZmlsdGVycztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2l6YWJsZUNvbHVtbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNvbHVtbldpZHRocyhzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZW9yZGVyYWJsZUNvbHVtbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNvbHVtbk9yZGVyKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgc3RhdGUuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5leHBhbmRlZFJvd0tleXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RhdGUuZXhwYW5kZWRSb3dLZXlzID0gdGhpcy5leHBhbmRlZFJvd0tleXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3RhdGUpLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKHRoaXMuc3RhdGVLZXksIEpTT04uc3RyaW5naWZ5KHN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uU3RhdGVTYXZlLmVtaXQoc3RhdGUpO1xuICAgIH1cblxuICAgIGNsZWFyU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZUtleSkge1xuICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuc3RhdGVLZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZVN0YXRlKCkge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKCk7XG4gICAgICAgIGNvbnN0IHN0YXRlU3RyaW5nID0gc3RvcmFnZS5nZXRJdGVtKHRoaXMuc3RhdGVLZXkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHN0YXRlU3RyaW5nKSB7XG4gICAgICAgICAgICBsZXQgc3RhdGU6IFRhYmxlU3RhdGUgPSBKU09OLnBhcnNlKHN0YXRlU3RyaW5nKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdCA9IHN0YXRlLmZpcnN0O1xuICAgICAgICAgICAgICAgIHRoaXMucm93cyA9IHN0YXRlLnJvd3M7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuZmlyc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMucm93c0NoYW5nZS5lbWl0KHRoaXMucm93cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5zb3J0RmllbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ1NvcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRGaWVsZCA9IHN0YXRlLnNvcnRGaWVsZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSBzdGF0ZS5zb3J0T3JkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5tdWx0aVNvcnRNZXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JpbmdTb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gc3RhdGUubXVsdGlTb3J0TWV0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YXRlLmZpbHRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ0ZpbHRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJzID0gc3RhdGUuZmlsdGVycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucmVzaXphYmxlQ29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uV2lkdGhzU3RhdGUgPSBzdGF0ZS5jb2x1bW5XaWR0aHM7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZVdpZHRoU3RhdGUgPSBzdGF0ZS50YWJsZVdpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdGUuZXhwYW5kZWRSb3dLZXlzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZFJvd0tleXMgPSBzdGF0ZS5leHBhbmRlZFJvd0tleXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHN0YXRlLnNlbGVjdGlvbikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlUmVzdG9yZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLm9uU3RhdGVSZXN0b3JlLmVtaXQoc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZUNvbHVtbldpZHRocyhzdGF0ZSkge1xuICAgICAgICBsZXQgd2lkdGhzID0gW107XG4gICAgICAgIGxldCBoZWFkZXJzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcudWktdGFibGUtdGhlYWQgPiB0cjpmaXJzdC1jaGlsZCA+IHRoJyk7XG4gICAgICAgIGhlYWRlcnMubWFwKGhlYWRlciA9PiB3aWR0aHMucHVzaChEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaGVhZGVyKSkpO1xuICAgICAgICBzdGF0ZS5jb2x1bW5XaWR0aHMgPSB3aWR0aHMuam9pbignLCcpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbHVtblJlc2l6ZU1vZGUgPT09ICdleHBhbmQnKSB7XG4gICAgICAgICAgICBzdGF0ZS50YWJsZVdpZHRoID0gdGhpcy5zY3JvbGxhYmxlID8gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcudWktdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItdGFibGUnKS5zdHlsZS53aWR0aCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlQ29sdW1uV2lkdGhzKCkge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5XaWR0aHNTdGF0ZSkge1xuICAgICAgICAgICAgbGV0IHdpZHRocyA9IHRoaXMuY29sdW1uV2lkdGhzU3RhdGUuc3BsaXQoJywnKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29sdW1uUmVzaXplTW9kZSA9PT0gJ2V4cGFuZCcgJiYgdGhpcy50YWJsZVdpZHRoU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Nyb2xsYWJsZUl0ZW1zV2lkdGhPbkV4cGFuZFJlc2l6ZShudWxsLCB0aGlzLnRhYmxlV2lkdGhTdGF0ZSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLnRhYmxlV2lkdGhTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMudGFibGVXaWR0aFN0YXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgICAgIGxldCBoZWFkZXJDb2xzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcudWktdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItdGFibGUgPiBjb2xncm91cCA+IGNvbCcpO1xuICAgICAgICAgICAgICAgIGxldCBib2R5Q29scyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnVpLXRhYmxlLXNjcm9sbGFibGUtYm9keS10YWJsZSA+IGNvbGdyb3VwID4gY29sJyk7XG5cbiAgICAgICAgICAgICAgICBoZWFkZXJDb2xzLm1hcCgoY29sLCBpbmRleCkgPT4gY29sLnN0eWxlLndpZHRoID0gd2lkdGhzW2luZGV4XSArICdweCcpO1xuICAgICAgICAgICAgICAgIGJvZHlDb2xzLm1hcCgoY29sLCBpbmRleCkgPT4gY29sLnN0eWxlLndpZHRoID0gd2lkdGhzW2luZGV4XSArICdweCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlcnMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnVpLXRhYmxlLXRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlcnMubWFwKChoZWFkZXIsIGluZGV4KSA9PiBoZWFkZXIuc3R5bGUud2lkdGggPSB3aWR0aHNbaW5kZXhdICsgJ3B4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgc2F2ZUNvbHVtbk9yZGVyKHN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW5PcmRlcjogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5PcmRlci5wdXNoKGNvbHVtbi5maWVsZHx8Y29sdW1uLmtleSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzdGF0ZS5jb2x1bW5PcmRlciA9IGNvbHVtbk9yZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZUNvbHVtbk9yZGVyKCkge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKCk7XG4gICAgICAgIGNvbnN0IHN0YXRlU3RyaW5nID0gc3RvcmFnZS5nZXRJdGVtKHRoaXMuc3RhdGVLZXkpO1xuICAgICAgICBpZiAoc3RhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZTogVGFibGVTdGF0ZSA9IEpTT04ucGFyc2Uoc3RhdGVTdHJpbmcpO1xuICAgICAgICAgICAgbGV0IGNvbHVtbk9yZGVyID0gc3RhdGUuY29sdW1uT3JkZXI7XG4gICAgICAgICAgICBpZiAoY29sdW1uT3JkZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVvcmRlcmVkQ29sdW1ucyA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbHVtbk9yZGVyLm1hcChrZXkgPT4gcmVvcmRlcmVkQ29sdW1ucy5wdXNoKHRoaXMuZmluZENvbHVtbkJ5S2V5KGtleSkpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbk9yZGVyU3RhdGVSZXN0b3JlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gcmVvcmRlcmVkQ29sdW1ucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRDb2x1bW5CeUtleShrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1ucykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sIG9mIHRoaXMuY29sdW1ucykge1xuICAgICAgICAgICAgICAgIGlmIChjb2wua2V5ID09PSBrZXkgfHwgY29sLmZpZWxkID09PSBrZXkpIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gbnVsbDtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3BUYWJsZUJvZHldJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWR0LmV4cGFuZGVkUm93VGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcm93RGF0YSBsZXQtcm93SW5kZXg9XCJpbmRleFwiIFtuZ0Zvck9mXT1cIihkdC5wYWdpbmF0b3IgJiYgIWR0LmxhenkpID8gKChkdC5maWx0ZXJlZFZhbHVlfHxkdC52YWx1ZSkgfCBzbGljZTpkdC5maXJzdDooZHQuZmlyc3QgKyBkdC5yb3dzKSkgOiAoZHQuZmlsdGVyZWRWYWx1ZXx8ZHQudmFsdWUpXCIgW25nRm9yVHJhY2tCeV09XCJkdC5yb3dUcmFja0J5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZHQucGFnaW5hdG9yID8gKGR0LmZpcnN0ICsgcm93SW5kZXgpIDogcm93SW5kZXgsIGNvbHVtbnM6IGNvbHVtbnMsIGVkaXRpbmc6IChkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpKX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuZXhwYW5kZWRSb3dUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3dEYXRhIGxldC1yb3dJbmRleD1cImluZGV4XCIgW25nRm9yT2ZdPVwiKGR0LnBhZ2luYXRvciAmJiAhZHQubGF6eSkgPyAoKGR0LmZpbHRlcmVkVmFsdWV8fGR0LnZhbHVlKSB8IHNsaWNlOmR0LmZpcnN0OihkdC5maXJzdCArIGR0LnJvd3MpKSA6IChkdC5maWx0ZXJlZFZhbHVlfHxkdC52YWx1ZSlcIiBbbmdGb3JUcmFja0J5XT1cImR0LnJvd1RyYWNrQnlcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBkdC5wYWdpbmF0b3IgPyAoZHQuZmlyc3QgKyByb3dJbmRleCkgOiByb3dJbmRleCwgY29sdW1uczogY29sdW1ucywgZXhwYW5kZWQ6IGR0LmlzUm93RXhwYW5kZWQocm93RGF0YSksIGVkaXRpbmc6IChkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpKX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuaXNSb3dFeHBhbmRlZChyb3dEYXRhKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuZXhwYW5kZWRSb3dUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogcm93RGF0YSwgcm93SW5kZXg6IGR0LnBhZ2luYXRvciA/IChkdC5maXJzdCArIHJvd0luZGV4KSA6IHJvd0luZGV4LCBjb2x1bW5zOiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkdC5pc0VtcHR5KClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdC5lbXB0eU1lc3NhZ2VUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogY29sdW1ucywgZnJvemVuOiBmcm96ZW59XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVCb2R5IHtcblxuICAgIEBJbnB1dChcInBUYWJsZUJvZHlcIikgY29sdW1uczogYW55W107XG5cbiAgICBASW5wdXQoXCJwVGFibGVCb2R5VGVtcGxhdGVcIikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gXG4gICAgQElucHV0KCkgZnJvemVuOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSkge31cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbcFNjcm9sbGFibGVWaWV3XScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjc2Nyb2xsSGVhZGVyIGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXIgdWktd2lkZ2V0LWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiAjc2Nyb2xsSGVhZGVyQm94IGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItYm94XCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItdGFibGVcIiBbbmdDbGFzc109XCJkdC50YWJsZVN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJkdC50YWJsZVN0eWxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmcm96ZW4gPyBkdC5mcm96ZW5Db2xHcm91cFRlbXBsYXRlfHxkdC5jb2xHcm91cFRlbXBsYXRlIDogZHQuY29sR3JvdXBUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJ1aS10YWJsZS10aGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZyb3plbiA/IGR0LmZyb3plbkhlYWRlclRlbXBsYXRlfHxkdC5oZWFkZXJUZW1wbGF0ZSA6IGR0LmhlYWRlclRlbXBsYXRlOyBjb250ZXh0IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInVpLXRhYmxlLXRib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvd0RhdGEgbGV0LXJvd0luZGV4PVwiaW5kZXhcIiBbbmdGb3JPZl09XCJkdC5mcm96ZW5WYWx1ZVwiIFtuZ0ZvclRyYWNrQnldPVwiZHQucm93VHJhY2tCeVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdC5mcm96ZW5Sb3dzVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiByb3dJbmRleCwgY29sdW1uczogY29sdW1uc31cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAjc2Nyb2xsQm9keSBjbGFzcz1cInVpLXRhYmxlLXNjcm9sbGFibGUtYm9keVwiPlxuICAgICAgICAgICAgPHRhYmxlICNzY3JvbGxUYWJsZSBbbmdDbGFzc109XCJ7J3VpLXRhYmxlLXNjcm9sbGFibGUtYm9keS10YWJsZSc6IHRydWUsICd1aS10YWJsZS12aXJ0dWFsLXRhYmxlJzogZHQudmlydHVhbFNjcm9sbH1cIiBbY2xhc3NdPVwiZHQudGFibGVTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiZHQudGFibGVTdHlsZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmcm96ZW4gPyBkdC5mcm96ZW5Db2xHcm91cFRlbXBsYXRlfHxkdC5jb2xHcm91cFRlbXBsYXRlIDogZHQuY29sR3JvdXBUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInVpLXRhYmxlLXRib2R5XCIgW3BUYWJsZUJvZHldPVwiY29sdW1uc1wiIFtwVGFibGVCb2R5VGVtcGxhdGVdPVwiZnJvemVuID8gZHQuZnJvemVuQm9keVRlbXBsYXRlfHxkdC5ib2R5VGVtcGxhdGUgOiBkdC5ib2R5VGVtcGxhdGVcIiBbZnJvemVuXT1cImZyb3plblwiPjwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPHRhYmxlICNsb2FkaW5nVGFibGUgKm5nSWY9XCJkdC52aXJ0dWFsU2Nyb2xsICYmIGR0LmxvYWRpbmdCb2R5VGVtcGxhdGUgIT0gbnVsbFwiIFtuZ0NsYXNzXT1cInsndWktdGFibGUtc2Nyb2xsYWJsZS1ib2R5LXRhYmxlIHVpLXRhYmxlLWxvYWRpbmctdmlydHVhbC10YWJsZSc6IHRydWUsICd1aS10YWJsZS12aXJ0dWFsLXRhYmxlJzogZHQudmlydHVhbFNjcm9sbH1cIj5cbiAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ1aS10YWJsZS10Ym9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwibG9hZGluZ0FycmF5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQubG9hZGluZ0JvZHlUZW1wbGF0ZTsgY29udGV4dDoge2NvbHVtbnM6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8ZGl2ICN2aXJ0dWFsU2Nyb2xsZXIgY2xhc3M9XCJ1aS10YWJsZS12aXJ0dWFsLXNjcm9sbGVyXCIgKm5nSWY9XCJkdC52aXJ0dWFsU2Nyb2xsXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICNzY3JvbGxGb290ZXIgKm5nSWY9XCJkdC5mb290ZXJUZW1wbGF0ZVwiIGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS1mb290ZXIgdWktd2lkZ2V0LWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiAjc2Nyb2xsRm9vdGVyQm94IGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS1mb290ZXItYm94XCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS1mb290ZXItdGFibGVcIiBbbmdDbGFzc109XCJkdC50YWJsZVN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJkdC50YWJsZVN0eWxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmcm96ZW4gPyBkdC5mcm96ZW5Db2xHcm91cFRlbXBsYXRlfHxkdC5jb2xHcm91cFRlbXBsYXRlIDogZHQuY29sR3JvdXBUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8dGZvb3QgY2xhc3M9XCJ1aS10YWJsZS10Zm9vdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZyb3plbiA/IGR0LmZyb3plbkZvb3RlclRlbXBsYXRlfHxkdC5mb290ZXJUZW1wbGF0ZSA6IGR0LmZvb3RlclRlbXBsYXRlOyBjb250ZXh0IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbGFibGVWaWV3IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cbiAgICBASW5wdXQoXCJwU2Nyb2xsYWJsZVZpZXdcIikgY29sdW1uczogYW55W107XG5cbiAgICBASW5wdXQoKSBmcm96ZW46IGJvb2xlYW47XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxIZWFkZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzY3JvbGxIZWFkZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxIZWFkZXJCb3gnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzY3JvbGxIZWFkZXJCb3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxCb2R5JywgeyBzdGF0aWM6IHRydWUgfSkgc2Nyb2xsQm9keVZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbFRhYmxlJywgeyBzdGF0aWM6IHRydWUgfSkgc2Nyb2xsVGFibGVWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdsb2FkaW5nVGFibGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnc2Nyb2xsRm9vdGVyJywgeyBzdGF0aWM6IHRydWUgfSkgc2Nyb2xsRm9vdGVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnc2Nyb2xsRm9vdGVyQm94JywgeyBzdGF0aWM6IHRydWUgfSkgc2Nyb2xsRm9vdGVyQm94Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgndmlydHVhbFNjcm9sbGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIHZpcnR1YWxTY3JvbGxlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIGhlYWRlclNjcm9sbExpc3RlbmVyOiBGdW5jdGlvbjtcblxuICAgIGJvZHlTY3JvbGxMaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgICBmb290ZXJTY3JvbGxMaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgICBmcm96ZW5TaWJsaW5nQm9keTogRWxlbWVudDtcblxuICAgIHNjcm9sbGFibGVTaWJsaW5nQm9keTogRWxlbWVudDtcblxuICAgIF9zY3JvbGxIZWlnaHQ6IHN0cmluZztcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgdG90YWxSZWNvcmRzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb2x1bW5zU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICBwcmV2ZW50Qm9keVNjcm9sbFByb3BhZ2F0aW9uOiBib29sZWFuO1xuXG4gICAgbG9hZGluZ0FycmF5OiBudW1iZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2UudmFsdWVTb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduU2Nyb2xsQmFyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5kdC52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3Jkc1N1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnRvdGFsUmVjb3Jkc1NvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlydHVhbFNjcm9sbGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nQXJyYXkgPSBBcnJheSh0aGlzLmR0LnJvd3MpLmZpbGwoMSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzY3JvbGxIZWlnaHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEhlaWdodDtcbiAgICB9XG4gICAgc2V0IHNjcm9sbEhlaWdodCh2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgPSB2YWw7XG4gICAgICAgIHRoaXMuc2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYoIXRoaXMuaW5pdGlhbGl6ZWQgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5hbGlnblNjcm9sbEJhcigpO1xuICAgICAgICAgICAgdGhpcy5zZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZighdGhpcy5mcm96ZW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LmZyb3plbkNvbHVtbnMgfHwgdGhpcy5kdC5mcm96ZW5Cb2R5VGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VpLXRhYmxlLXVuZnJvemVuLXZpZXcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGZyb3plblZpZXcgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChmcm96ZW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5TaWJsaW5nQm9keSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShmcm96ZW5WaWV3LCAnLnVpLXRhYmxlLXNjcm9sbGFibGUtYm9keScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IERvbUhhbmRsZXIuY2FsY3VsYXRlU2Nyb2xsYmFyV2lkdGgoKSArICdweCc7XG4gICAgICAgICAgICBsZXQgc2Nyb2xsYWJsZVZpZXcgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgaWYgKHNjcm9sbGFibGVWaWV3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlU2libGluZ0JvZHkgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZVZpZXcsICcudWktdGFibGUtc2Nyb2xsYWJsZS1ib2R5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5zZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgdGhpcy5hbGlnblNjcm9sbEJhcigpO1xuXG4gICAgICAgIGlmICh0aGlzLmZyb3plbikge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zU3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2UuY29sdW1uc1NvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5kdC52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZpcnR1YWxTY3JvbGxlckhlaWdodCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICd0YWJsZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNjcm9sbEJhcldpZHRoID0gRG9tSGFuZGxlci5jYWxjdWxhdGVTY3JvbGxiYXJXaWR0aCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyU2Nyb2xsTGlzdGVuZXIgPSB0aGlzLm9uSGVhZGVyU2Nyb2xsLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhlYWRlclNjcm9sbExpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclNjcm9sbExpc3RlbmVyID0gdGhpcy5vbkZvb3RlclNjcm9sbC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5mb290ZXJTY3JvbGxMaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCF0aGlzLmZyb3plbikge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9keVNjcm9sbExpc3RlbmVyID0gdGhpcy5vbkJvZHlTY3JvbGwuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmJvZHlTY3JvbGxMaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZEV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oZWFkZXJTY3JvbGxMaXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmZvb3RlclNjcm9sbExpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuYm9keVNjcm9sbExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBvbkhlYWRlclNjcm9sbChldmVudCkge1xuICAgICAgICBjb25zdCBzY3JvbGxMZWZ0ID0gdGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2ZW50Qm9keVNjcm9sbFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkZvb3RlclNjcm9sbChldmVudCkge1xuICAgICAgICBjb25zdCBzY3JvbGxMZWZ0ID0gdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2ZW50Qm9keVNjcm9sbFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJvZHlTY3JvbGwoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldmVudEJvZHlTY3JvbGxQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcmV2ZW50Qm9keVNjcm9sbFByb3BhZ2F0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIZWFkZXJCb3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5tYXJnaW5MZWZ0ID0gLTEgKiB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEZvb3RlckJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLm1hcmdpbkxlZnQgPSAtMSAqIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZnJvemVuU2libGluZ0JvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuZnJvemVuU2libGluZ0JvZHkuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5kdC52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICBsZXQgdmlld3BvcnQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGxldCB0YWJsZUhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5zY3JvbGxUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGxldCBwYWdlSGVpZ2h0ID0gdGhpcy5kdC52aXJ0dWFsUm93SGVpZ2h0ICogdGhpcy5kdC5yb3dzO1xuICAgICAgICAgICAgbGV0IHZpcnR1YWxUYWJsZUhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy52aXJ0dWFsU2Nyb2xsZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgcGFnZUNvdW50ID0gKHZpcnR1YWxUYWJsZUhlaWdodCAvIHBhZ2VIZWlnaHQpfHwxO1xuICAgICAgICAgICAgbGV0IHNjcm9sbEJvZHlUb3AgPSB0aGlzLnNjcm9sbFRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wfHwnMCc7XG5cbiAgICAgICAgICAgIGlmKCh0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgKyB2aWV3cG9ydCA+IHBhcnNlRmxvYXQoc2Nyb2xsQm9keVRvcCkgKyB0YWJsZUhlaWdodCkgfHzCoCh0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPCBwYXJzZUZsb2F0KHNjcm9sbEJvZHlUb3ApKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICd0YWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFnZSA9IE1hdGguZmxvb3IoKHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCAqIHBhZ2VDb3VudCkgLyAodGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSkgKyAxO1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlVmlydHVhbFNjcm9sbCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9ICgocGFnZSAtIDEpICogcGFnZUhlaWdodCkgKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mcm96ZW5TaWJsaW5nQm9keSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8SFRNTEVsZW1lbnQ+IHRoaXMuZnJvemVuU2libGluZ0JvZHkuY2hpbGRyZW5bMF0pLnN0eWxlLnRvcCA9IHRoaXMuc2Nyb2xsVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS50b3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHQuYW5jaG9yUm93SW5kZXggPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTY3JvbGxIZWlnaHQoKSB7XG4gICAgICAgIGlmKHRoaXMuc2Nyb2xsSGVpZ2h0ICYmIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYodGhpcy5zY3JvbGxIZWlnaHQuaW5kZXhPZignJScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGxldCByZWxhdGl2ZUhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMHB4JzsgICAgIC8vdGVtcG9yYXJ5IGhlaWdodCB0byBjYWxjdWxhdGUgc3RhdGljIGhlaWdodFxuICAgICAgICAgICAgICAgIGxldCBjb250YWluZXJIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGVpZ2h0LmluY2x1ZGVzKFwiY2FsY1wiKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudEhlaWdodCA9IHBhcnNlSW50KHRoaXMuc2Nyb2xsSGVpZ2h0LnNsaWNlKHRoaXMuc2Nyb2xsSGVpZ2h0LmluZGV4T2YoXCIoXCIpICsgMSwgdGhpcy5zY3JvbGxIZWlnaHQuaW5kZXhPZihcIiVcIikpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZmZWYWx1ZSA9IHBhcnNlSW50KHRoaXMuc2Nyb2xsSGVpZ2h0LnNsaWNlKHRoaXMuc2Nyb2xsSGVpZ2h0LmluZGV4T2YoXCItXCIpICsgMSwgdGhpcy5zY3JvbGxIZWlnaHQuaW5kZXhPZihcIilcIikpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVIZWlnaHQgPSAoRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkgKiBwZXJjZW50SGVpZ2h0IC8gMTAwKSAtIGRpZmZWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlSGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkgKiBwYXJzZUludCh0aGlzLnNjcm9sbEhlaWdodCkgLyAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBzdGF0aWNIZWlnaHQgPSBjb250YWluZXJIZWlnaHQgLSAxMDA7ICAgLy90b3RhbCBoZWlnaHQgb2YgaGVhZGVycywgZm9vdGVycywgcGFnaW5hdG9yc1xuICAgICAgICAgICAgICAgIGxldCBzY3JvbGxCb2R5SGVpZ2h0ID0gKHJlbGF0aXZlSGVpZ2h0IC0gc3RhdGljSGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZnJvemVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJvZHlIZWlnaHQgLT0gRG9tSGFuZGxlci5jYWxjdWxhdGVTY3JvbGxiYXJXaWR0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gc2Nyb2xsQm9keUhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZih0aGlzLmZyb3plbiAmJiB0aGlzLnNjcm9sbGFibGVTaWJsaW5nQm9keSAmJiBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5zY3JvbGxhYmxlU2libGluZ0JvZHkpIDwgRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuc2Nyb2xsYWJsZVNpYmxpbmdCb2R5LmNoaWxkcmVuWzBdKSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gKHBhcnNlSW50KHRoaXMuc2Nyb2xsSGVpZ2h0KSAtIERvbUhhbmRsZXIuY2FsY3VsYXRlU2Nyb2xsYmFyV2lkdGgoKSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gdGhpcy5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRWaXJ0dWFsU2Nyb2xsZXJIZWlnaHQoKSB7XG4gICAgICAgIGlmKHRoaXMudmlydHVhbFNjcm9sbGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5kdC50b3RhbFJlY29yZHMgKiB0aGlzLmR0LnZpcnR1YWxSb3dIZWlnaHQgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzVmVydGljYWxPdmVyZmxvdygpIHtcbiAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5zY3JvbGxUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSA+IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGFsaWduU2Nyb2xsQmFyKCkge1xuICAgICAgICBpZighdGhpcy5mcm96ZW4pIHtcbiAgICAgICAgICAgIGxldCBzY3JvbGxCYXJXaWR0aCA9IHRoaXMuaGFzVmVydGljYWxPdmVyZmxvdygpID8gRG9tSGFuZGxlci5jYWxjdWxhdGVTY3JvbGxiYXJXaWR0aCgpIDogMDtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGVhZGVyQm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWFyZ2luUmlnaHQgPSBzY3JvbGxCYXJXaWR0aCArICdweCc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMuc2Nyb2xsRm9vdGVyQm94Vmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsRm9vdGVyQm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEZvb3RlckJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsQmFyV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcblxuICAgICAgICB0aGlzLmZyb3plblNpYmxpbmdCb2R5ID0gbnVsbDtcblxuICAgICAgICBpZih0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMudG90YWxSZWNvcmRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3Jkc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5jb2x1bW5zU3Vic2NyaXB0aW9uKcKge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twU29ydGFibGVDb2x1bW5dJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MudWktc29ydGFibGUtY29sdW1uXSc6ICdpc0VuYWJsZWQoKScsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtaGlnaGxpZ2h0XSc6ICdzb3J0ZWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2lzRW5hYmxlZCgpID8gXCIwXCIgOiBudWxsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU29ydGFibGVDb2x1bW4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoXCJwU29ydGFibGVDb2x1bW5cIikgZmllbGQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBTb3J0YWJsZUNvbHVtbkRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgc29ydGVkOiBib29sZWFuO1xuICAgIFxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zb3J0U291cmNlJC5zdWJzY3JpYmUoc29ydE1ldGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU29ydFN0YXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNvcnRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zb3J0ZWQgPSB0aGlzLmR0LmlzU29ydGVkKHRoaXMuZmllbGQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5kdC5zb3J0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5maWVsZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZW50ZXInLCBbJyRldmVudCddKVxuICAgIG9uRW50ZXJLZXkoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrKGV2ZW50KTtcbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBTb3J0YWJsZUNvbHVtbkRpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc29ydEljb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpIGNsYXNzPVwidWktc29ydGFibGUtY29sdW1uLWljb24gcGkgcGktZndcIiBbbmdDbGFzc109XCJ7J3BpLXNvcnQtdXAnOiBzb3J0T3JkZXIgPT09IDEsICdwaS1zb3J0LWRvd24nOiBzb3J0T3JkZXIgPT09IC0xLCAncGktc29ydCc6IHNvcnRPcmRlciA9PT0gMH1cIj48L2k+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTb3J0SWNvbiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xuICAgICAgICBcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBcbiAgICBzb3J0T3JkZXI6IG51bWJlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc29ydFNvdXJjZSQuc3Vic2NyaWJlKHNvcnRNZXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU29ydFN0YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICB9XG4gICAgXG4gICAgb25DbGljayhldmVudCl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNvcnRTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHQuc29ydE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMuZHQuaXNTb3J0ZWQodGhpcy5maWVsZCkgPyB0aGlzLmR0LnNvcnRPcmRlciA6IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5kdC5zb3J0TW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgICAgICAgbGV0IHNvcnRNZXRhID0gdGhpcy5kdC5nZXRTb3J0TWV0YSh0aGlzLmZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMuc29ydE9yZGVyID0gc29ydE1ldGEgPyBzb3J0TWV0YS5vcmRlcjogMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twU2VsZWN0YWJsZVJvd10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1zZWxlY3RhYmxlLXJvd10nOiAnaXNFbmFibGVkKCknLFxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWhpZ2hsaWdodF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2lzRW5hYmxlZCgpID8gMCA6IHVuZGVmaW5lZCcsXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RhYmxlUm93IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KFwicFNlbGVjdGFibGVSb3dcIikgZGF0YTogYW55O1xuXG4gICAgQElucHV0KFwicFNlbGVjdGFibGVSb3dJbmRleFwiKSBpbmRleDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcFNlbGVjdGFibGVSb3dEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmR0LmlzU2VsZWN0ZWQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlUm93Q2xpY2soe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHJvd0RhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcigndG91Y2hlbmQnLCBbJyRldmVudCddKVxuICAgIG9uVG91Y2hFbmQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0LmhhbmRsZVJvd1RvdWNoRW5kKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+IGV2ZW50LnRhcmdldDtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgICAgIC8vZG93biBhcnJvd1xuICAgICAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0Um93ID0gdGhpcy5maW5kTmV4dFNlbGVjdGFibGVSb3cocm93KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3cuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4gICAgICAgICAgICAgICAgLy91cCBhcnJvd1xuICAgICAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2Um93ID0gdGhpcy5maW5kUHJldlNlbGVjdGFibGVSb3cocm93KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZSb3cuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4gICAgICAgICAgICAgICAgLy9lbnRlclxuICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlUm93Q2xpY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dEYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vbm8gb3BcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmROZXh0U2VsZWN0YWJsZVJvdyhyb3c6IEhUTUxUYWJsZVJvd0VsZW1lbnQpOiBIVE1MVGFibGVSb3dFbGVtZW50IHtcbiAgICAgICAgbGV0IG5leHRSb3cgPSA8SFRNTFRhYmxlUm93RWxlbWVudD4gcm93Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRSb3csICd1aS1zZWxlY3RhYmxlLXJvdycpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0Um93O1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmROZXh0U2VsZWN0YWJsZVJvdyhuZXh0Um93KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZFByZXZTZWxlY3RhYmxlUm93KHJvdzogSFRNTFRhYmxlUm93RWxlbWVudCk6IEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICAgICAgICBsZXQgcHJldlJvdyA9IDxIVE1MVGFibGVSb3dFbGVtZW50PiByb3cucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgaWYgKHByZXZSb3cpIHtcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKHByZXZSb3csICd1aS1zZWxlY3RhYmxlLXJvdycpKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2Um93O1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRQcmV2U2VsZWN0YWJsZVJvdyhwcmV2Um93KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucFNlbGVjdGFibGVSb3dEaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BTZWxlY3RhYmxlUm93RGJsQ2xpY2tdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MudWktc2VsZWN0YWJsZS1yb3ddJzogJ2lzRW5hYmxlZCgpJyxcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1oaWdobGlnaHRdJzogJ3NlbGVjdGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0YWJsZVJvd0RibENsaWNrIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KFwicFNlbGVjdGFibGVSb3dEYmxDbGlja1wiKSBkYXRhOiBhbnk7XG5cbiAgICBASW5wdXQoXCJwU2VsZWN0YWJsZVJvd0luZGV4XCIpIGluZGV4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBwU2VsZWN0YWJsZVJvd0Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmR0LmlzU2VsZWN0ZWQodGhpcy5kYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kdC5oYW5kbGVSb3dDbGljayh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcm93RGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBTZWxlY3RhYmxlUm93RGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twQ29udGV4dE1lbnVSb3ddJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MudWktY29udGV4dG1lbnUtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVSb3cge1xuXG4gICAgQElucHV0KFwicENvbnRleHRNZW51Um93XCIpIGRhdGE6IGFueTtcblxuICAgIEBJbnB1dChcInBDb250ZXh0TWVudVJvd0luZGV4XCIpIGluZGV4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBwQ29udGV4dE1lbnVSb3dEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2UuY29udGV4dE1lbnVTb3VyY2UkLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmR0LmVxdWFscyh0aGlzLmRhdGEsIGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXG4gICAgb25Db250ZXh0TWVudShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlUm93UmlnaHRDbGljayh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcm93RGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBDb250ZXh0TWVudVJvd0Rpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFJvd1RvZ2dsZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBSb3dUb2dnbGVyIHtcblxuICAgIEBJbnB1dCgncFJvd1RvZ2dsZXInKSBkYXRhOiBhbnk7XG5cbiAgICBASW5wdXQoKSBwUm93VG9nZ2xlckRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSkgeyB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQudG9nZ2xlUm93KHRoaXMuZGF0YSwgZXZlbnQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucFJvd1RvZ2dsZXJEaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BSZXNpemFibGVDb2x1bW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVDb2x1bW4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgcFJlc2l6YWJsZUNvbHVtbkRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgcmVzaXplcjogSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgcmVzaXplck1vdXNlRG93bkxpc3RlbmVyOiBhbnk7XG5cbiAgICBkb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyOiBhbnk7XG5cbiAgICBkb2N1bWVudE1vdXNlVXBMaXN0ZW5lcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7IH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktcmVzaXphYmxlLWNvbHVtbicpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVyLmNsYXNzTmFtZSA9ICd1aS1jb2x1bW4tcmVzaXplciB1aS1jbGlja2FibGUnO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucmVzaXplcik7XG4gICAgXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplck1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLnJlc2l6ZXJNb3VzZURvd25MaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lciA9IHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lciA9IHRoaXMub25Eb2N1bWVudE1vdXNlVXAuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uUmVzaXplQmVnaW4oZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFdmVudHMoKTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBvbkRvY3VtZW50TW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Db2x1bW5SZXNpemUoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uRG9jdW1lbnRNb3VzZVVwKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Db2x1bW5SZXNpemVFbmQoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBSZXNpemFibGVDb2x1bW5EaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplck1vdXNlRG93bkxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5yZXNpemVyTW91c2VEb3duTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RXZlbnRzKCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twUmVvcmRlcmFibGVDb2x1bW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZUNvbHVtbiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBwUmVvcmRlcmFibGVDb2x1bW5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIGRyYWdTdGFydExpc3RlbmVyOiBhbnk7XG5cbiAgICBkcmFnT3Zlckxpc3RlbmVyOiBhbnk7XG5cbiAgICBkcmFnRW50ZXJMaXN0ZW5lcjogYW55O1xuXG4gICAgZHJhZ0xlYXZlTGlzdGVuZXI6IGFueTtcblxuICAgIG1vdXNlRG93bkxpc3RlbmVyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHsgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lciA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkxpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lciA9IHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydExpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gdGhpcy5vbkRyYWdFbnRlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3Zlckxpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lciA9IHRoaXMub25EcmFnRW50ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzLmRyYWdFbnRlckxpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IHRoaXMub25EcmFnTGVhdmUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5tb3VzZURvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25MaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdPdmVyTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3Zlckxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnRW50ZXJMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbnRlckxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdFbnRlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzLmRyYWdFbnRlckxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0VudGVyTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnSU5QVVQnIHx8IGV2ZW50LnRhcmdldC5ub2RlTmFtZSA9PT0gJ1RFWFRBUkVBJyB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3VpLWNvbHVtbi1yZXNpemVyJykpXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Db2x1bW5EcmFnU3RhcnQoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgb25EcmFnT3ZlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRHJhZ0VudGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Db2x1bW5EcmFnRW50ZXIoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgb25EcmFnTGVhdmUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtbkRyYWdMZWF2ZShldmVudCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gICAgb25Ecm9wKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uRHJvcChldmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucFJlb3JkZXJhYmxlQ29sdW1uRGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BFZGl0YWJsZUNvbHVtbl0nXG59KVxuZXhwb3J0IGNsYXNzIEVkaXRhYmxlQ29sdW1uIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoXCJwRWRpdGFibGVDb2x1bW5cIikgZGF0YTogYW55O1xuXG4gICAgQElucHV0KFwicEVkaXRhYmxlQ29sdW1uRmllbGRcIikgZmllbGQ6IGFueTtcblxuICAgIEBJbnB1dCgpIHBFZGl0YWJsZUNvbHVtbkRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcEZvY3VzQ2VsbFNlbGVjdG9yOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VpLWVkaXRhYmxlLWNvbHVtbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQuZWRpdGluZ0NlbGxDbGljayA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmR0LmVkaXRpbmdDZWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHQuZWRpdGluZ0NlbGwgIT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHQuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmR0LmVkaXRpbmdDZWxsLCAndWktZWRpdGluZy1jZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkNlbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5DZWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5kdC51cGRhdGVFZGl0aW5nQ2VsbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGF0YSwgdGhpcy5maWVsZCk7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktZWRpdGluZy1jZWxsJyk7XG4gICAgICAgIHRoaXMuZHQub25FZGl0SW5pdC5lbWl0KHsgZmllbGQ6IHRoaXMuZmllbGQsIGRhdGE6IHRoaXMuZGF0YX0pO1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbFNlbGVjdG9yID0gdGhpcy5wRm9jdXNDZWxsU2VsZWN0b3IgfHwgJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0JztcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGZvY3VzQ2VsbFNlbGVjdG9yKTtcblxuICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsb3NlRWRpdGluZ0NlbGwoKSB7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kdC5lZGl0aW5nQ2VsbCwgJ3VpLWVkaXRpbmctY2VsbCcpO1xuICAgICAgICB0aGlzLmR0LmVkaXRpbmdDZWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5kdC5lZGl0aW5nQ2VsbERhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLmR0LmVkaXRpbmdDZWxsRmllbGQgPSBudWxsO1xuICAgICAgICB0aGlzLmR0LnVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFZGl0aW5nQ2VsbCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmR0Lm9uRWRpdENvbXBsZXRlLmVtaXQoeyBmaWVsZDogdGhpcy5maWVsZCwgZGF0YTogdGhpcy5kYXRhLCBvcmlnaW5hbEV2ZW50OiBldmVudCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIC8vZXNjYXBlXG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHQuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHQub25FZGl0Q2FuY2VsLmVtaXQoeyBmaWVsZDogdGhpcy5maWVsZCwgZGF0YTogdGhpcy5kYXRhLCBvcmlnaW5hbEV2ZW50OiBldmVudCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIC8vdGFiXG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09IDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR0Lm9uRWRpdENvbXBsZXRlLmVtaXQoeyBmaWVsZDogdGhpcy5maWVsZCwgZGF0YTogdGhpcy5kYXRhLCBvcmlnaW5hbEV2ZW50OiBldmVudCB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvUHJldmlvdXNDZWxsKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvTmV4dENlbGwoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZENlbGwoZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBlbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUgKGNlbGwgJiYgIURvbUhhbmRsZXIuaGFzQ2xhc3MoY2VsbCwgJ3VpLWVkaXRpbmctY2VsbCcpKSB7XG4gICAgICAgICAgICAgICAgY2VsbCA9IGNlbGwucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVUb1ByZXZpb3VzQ2VsbChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBsZXQgY3VycmVudENlbGwgPSB0aGlzLmZpbmRDZWxsKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGxldCByb3cgPSBjdXJyZW50Q2VsbC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IHRoaXMuZmluZFByZXZpb3VzRWRpdGFibGVDb2x1bW4oY3VycmVudENlbGwpO1xuXG4gICAgICAgIGlmICh0YXJnZXRDZWxsKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCAnYmx1cicpO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKHRhcmdldENlbGwsICdjbGljaycpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVUb05leHRDZWxsKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGxldCBjdXJyZW50Q2VsbCA9IHRoaXMuZmluZENlbGwoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgbGV0IHJvdyA9IGN1cnJlbnRDZWxsLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGxldCB0YXJnZXRDZWxsID0gdGhpcy5maW5kTmV4dEVkaXRhYmxlQ29sdW1uKGN1cnJlbnRDZWxsKTtcblxuICAgICAgICBpZiAodGFyZ2V0Q2VsbCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgJ2JsdXInKTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0YXJnZXRDZWxsLCAnY2xpY2snKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kUHJldmlvdXNFZGl0YWJsZUNvbHVtbihjZWxsOiBFbGVtZW50KSB7XG4gICAgICAgIGxldCBwcmV2Q2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAoIXByZXZDZWxsKSB7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1Jvdykge1xuICAgICAgICAgICAgICAgIHByZXZDZWxsID0gcHJldmlvdXNSb3cubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2Q2VsbCkge1xuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkNlbGwsICd1aS1lZGl0YWJsZS1jb2x1bW4nKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldkNlbGw7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZFByZXZpb3VzRWRpdGFibGVDb2x1bW4ocHJldkNlbGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dEVkaXRhYmxlQ29sdW1uKGNlbGw6IEVsZW1lbnQpIHtcbiAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKCFuZXh0Q2VsbCkge1xuICAgICAgICAgICAgbGV0IG5leHRSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgICAgICBuZXh0Q2VsbCA9IG5leHRSb3cuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dENlbGwpIHtcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRDZWxsLCAndWktZWRpdGFibGUtY29sdW1uJykpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHRDZWxsO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmROZXh0RWRpdGFibGVDb2x1bW4obmV4dENlbGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBFZGl0YWJsZUNvbHVtbkRpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twRWRpdGFibGVSb3ddJ1xufSlcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVJvdyB7XG5cbiAgICBASW5wdXQoXCJwRWRpdGFibGVSb3dcIikgZGF0YTogYW55O1xuXG4gICAgQElucHV0KCkgcEVkaXRhYmxlUm93RGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBFZGl0YWJsZVJvd0Rpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twSW5pdEVkaXRhYmxlUm93XSdcbn0pXG5leHBvcnQgY2xhc3MgSW5pdEVkaXRhYmxlUm93IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlZGl0YWJsZVJvdzogRWRpdGFibGVSb3cpIHt9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5pbml0Um93RWRpdCh0aGlzLmVkaXRhYmxlUm93LmRhdGEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twU2F2ZUVkaXRhYmxlUm93XSdcbn0pXG5leHBvcnQgY2xhc3MgU2F2ZUVkaXRhYmxlUm93IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlZGl0YWJsZVJvdzogRWRpdGFibGVSb3cpIHt9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5zYXZlUm93RWRpdCh0aGlzLmVkaXRhYmxlUm93LmRhdGEsIHRoaXMuZWRpdGFibGVSb3cuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twQ2FuY2VsRWRpdGFibGVSb3ddJ1xufSlcbmV4cG9ydCBjbGFzcyBDYW5jZWxFZGl0YWJsZVJvdyB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWRpdGFibGVSb3c6IEVkaXRhYmxlUm93KSB7fVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQuY2FuY2VsUm93RWRpdCh0aGlzLmVkaXRhYmxlUm93LmRhdGEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNlbGxFZGl0b3InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJlZGl0aW5nXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaW5wdXRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFlZGl0aW5nXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwib3V0cHV0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBDZWxsRWRpdG9yIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+O1xuXG4gICAgaW5wdXRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIG91dHB1dFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgQE9wdGlvbmFsKCkgcHVibGljIGVkaXRhYmxlQ29sdW1uOiBFZGl0YWJsZUNvbHVtbiwgQE9wdGlvbmFsKCkgcHVibGljIGVkaXRhYmxlUm93OiBFZGl0YWJsZVJvdykgeyB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpbnB1dCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnb3V0cHV0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgZWRpdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmR0LmVkaXRpbmdDZWxsICYmIHRoaXMuZWRpdGFibGVDb2x1bW4gJiYgdGhpcy5kdC5lZGl0aW5nQ2VsbCA9PT0gdGhpcy5lZGl0YWJsZUNvbHVtbi5lbC5uYXRpdmVFbGVtZW50KSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLmVkaXRhYmxlUm93ICYmIHRoaXMuZHQuZWRpdE1vZGUgPT09ICdyb3cnICYmIHRoaXMuZHQuaXNSb3dFZGl0aW5nKHRoaXMuZWRpdGFibGVSb3cuZGF0YSkpO1xuICAgIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFibGVSYWRpb0J1dHRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLXJhZGlvYnV0dG9uIHVpLXdpZGdldFwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICNib3ggW25nQ2xhc3NdPVwieyd1aS1yYWRpb2J1dHRvbi1ib3ggdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWFjdGl2ZSc6Y2hlY2tlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXJhZGlvYnV0dG9uLWljb24gdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwieydwaSBwaS1jaXJjbGUtb24nOmNoZWNrZWR9XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVSYWRpb0J1dHRvbiAge1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAgIEBWaWV3Q2hpbGQoJ2JveCcsIHsgc3RhdGljOiB0cnVlIH0pIGJveFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIGNoZWNrZWQ6IGJvb2xlYW47XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnNlbGVjdGlvblNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZighdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5kdC50b2dnbGVSb3dXaXRoUmFkaW8oe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICB9LCB0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBEb21IYW5kbGVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5ib3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXN0YXRlLWZvY3VzJyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgIFxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFibGVDaGVja2JveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveCB1aS13aWRnZXRcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImNoZWNrZWRcIiAoZm9jdXMpPVwib25Gb2N1cygpXCIgKGJsdXIpPVwib25CbHVyKClcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjYm94IFtuZ0NsYXNzXT1cInsndWktY2hrYm94LWJveCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCc6dHJ1ZSxcbiAgICAgICAgICAgICAgICAndWktc3RhdGUtYWN0aXZlJzpjaGVja2VkLCAndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkfVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2hrYm94LWljb24gdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwieydwaSBwaS1jaGVjayc6Y2hlY2tlZH1cIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUNoZWNrYm94ICB7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuXG4gICAgQFZpZXdDaGlsZCgnYm94JywgeyBzdGF0aWM6IHRydWUgfSkgYm94Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgY2hlY2tlZDogYm9vbGVhbjtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmR0LnRvZ2dsZVJvd1dpdGhDaGVja2JveCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcm93SW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgICAgIH0sIHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuYm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd1aS1zdGF0ZS1mb2N1cycpO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJsZUhlYWRlckNoZWNrYm94JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94IHVpLXdpZGdldFwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2NiIHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImNoZWNrZWRcIiAoZm9jdXMpPVwib25Gb2N1cygpXCIgKGJsdXIpPVwib25CbHVyKClcIiBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZCgpXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgI2JveCBbbmdDbGFzc109XCJ7J3VpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWFjdGl2ZSc6Y2hlY2tlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzogaXNEaXNhYmxlZCgpfVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2hrYm94LWljb24gdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwieydwaSBwaS1jaGVjayc6Y2hlY2tlZH1cIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckNoZWNrYm94ICB7XG5cbiAgICBAVmlld0NoaWxkKCdib3gnLCB7IHN0YXRpYzogdHJ1ZSB9KSBib3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIGNoZWNrZWQ6IGJvb2xlYW47XG5cbiAgICBzZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnZhbHVlU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy51cGRhdGVDaGVja2VkU3RhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnVwZGF0ZUNoZWNrZWRTdGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy51cGRhdGVDaGVja2VkU3RhdGUoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LnZhbHVlICYmIHRoaXMuZHQudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHQudG9nZ2xlUm93c1dpdGhDaGVja2JveChldmVudCwgIXRoaXMuY2hlY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBEb21IYW5kbGVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5ib3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXN0YXRlLWZvY3VzJyk7XG4gICAgfVxuXG4gICAgaXNEaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuZHQudmFsdWUgfHwgIXRoaXMuZHQudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQ2hlY2tlZFN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5kdC5maWx0ZXJlZFZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmR0LmZpbHRlcmVkVmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCAmJiB0aGlzLmR0LnNlbGVjdGlvbiAmJiB0aGlzLmR0LnNlbGVjdGlvbi5sZW5ndGggPiAwICYmIHRoaXMuaXNBbGxGaWx0ZXJlZFZhbHVlc0NoZWNrZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmR0LnZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuICh2YWwgJiYgdmFsLmxlbmd0aCA+IDAgJiYgdGhpcy5kdC5zZWxlY3Rpb24gJiYgdGhpcy5kdC5zZWxlY3Rpb24ubGVuZ3RoID4gMCAmJiB0aGlzLmR0LnNlbGVjdGlvbi5sZW5ndGggPT09IHZhbC5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNBbGxGaWx0ZXJlZFZhbHVlc0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5kdC5maWx0ZXJlZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCByb3dEYXRhIG9mIHRoaXMuZHQuZmlsdGVyZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kdC5pc1NlbGVjdGVkKHJvd0RhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgIFxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twUmVvcmRlcmFibGVSb3dIYW5kbGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZVJvd0hhbmRsZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KFwicFJlb3JkZXJhYmxlUm93SGFuZGxlXCIpIGluZGV4OiBudW1iZXI7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VpLXRhYmxlLXJlb3JkZXJhYmxlcm93LWhhbmRsZScpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFJlb3JkZXJhYmxlUm93XSdcbn0pXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVSb3cgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dChcInBSZW9yZGVyYWJsZVJvd1wiKSBpbmRleDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcFJlb3JkZXJhYmxlUm93RGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBtb3VzZURvd25MaXN0ZW5lcjogYW55O1xuXG4gICAgZHJhZ1N0YXJ0TGlzdGVuZXI6IGFueTtcblxuICAgIGRyYWdFbmRMaXN0ZW5lcjogYW55O1xuXG4gICAgZHJhZ092ZXJMaXN0ZW5lcjogYW55O1xuXG4gICAgZHJhZ0xlYXZlTGlzdGVuZXI6IGFueTtcblxuICAgIGRyb3BMaXN0ZW5lcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyb3BwYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdTdGFydExpc3RlbmVyID0gdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdFbmRMaXN0ZW5lciA9IHRoaXMub25EcmFnRW5kLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZExpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gdGhpcy5vbkRyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyTGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyID0gdGhpcy5vbkRyYWdMZWF2ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vdXNlRG93bkxpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmRMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbmRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnT3Zlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICd1aS10YWJsZS1yZW9yZGVyYWJsZXJvdy1oYW5kbGUnKSlcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vblJvd0RyYWdTdGFydChldmVudCwgdGhpcy5pbmRleCk7XG4gICAgfVxuXG4gICAgb25EcmFnRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Sb3dEcmFnRW5kKGV2ZW50KTtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vblJvd0RyYWdPdmVyKGV2ZW50LCB0aGlzLmluZGV4LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Sb3dEcmFnTGVhdmUoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wUmVvcmRlcmFibGVSb3dEaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgICBvbkRyb3AoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkgJiYgdGhpcy5kdC5yb3dEcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5kdC5vblJvd0Ryb3AoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFBhZ2luYXRvck1vZHVsZV0sXG4gICAgZXhwb3J0czogW1RhYmxlLFNoYXJlZE1vZHVsZSxTb3J0YWJsZUNvbHVtbixTZWxlY3RhYmxlUm93LFJvd1RvZ2dsZXIsQ29udGV4dE1lbnVSb3csUmVzaXphYmxlQ29sdW1uLFJlb3JkZXJhYmxlQ29sdW1uLEVkaXRhYmxlQ29sdW1uLENlbGxFZGl0b3IsU29ydEljb24sVGFibGVSYWRpb0J1dHRvbixUYWJsZUNoZWNrYm94LFRhYmxlSGVhZGVyQ2hlY2tib3gsUmVvcmRlcmFibGVSb3dIYW5kbGUsUmVvcmRlcmFibGVSb3csU2VsZWN0YWJsZVJvd0RibENsaWNrLEVkaXRhYmxlUm93LEluaXRFZGl0YWJsZVJvdyxTYXZlRWRpdGFibGVSb3csQ2FuY2VsRWRpdGFibGVSb3ddLFxuICAgIGRlY2xhcmF0aW9uczogW1RhYmxlLFNvcnRhYmxlQ29sdW1uLFNlbGVjdGFibGVSb3csUm93VG9nZ2xlcixDb250ZXh0TWVudVJvdyxSZXNpemFibGVDb2x1bW4sUmVvcmRlcmFibGVDb2x1bW4sRWRpdGFibGVDb2x1bW4sQ2VsbEVkaXRvcixUYWJsZUJvZHksU2Nyb2xsYWJsZVZpZXcsU29ydEljb24sVGFibGVSYWRpb0J1dHRvbixUYWJsZUNoZWNrYm94LFRhYmxlSGVhZGVyQ2hlY2tib3gsUmVvcmRlcmFibGVSb3dIYW5kbGUsUmVvcmRlcmFibGVSb3csU2VsZWN0YWJsZVJvd0RibENsaWNrLEVkaXRhYmxlUm93LEluaXRFZGl0YWJsZVJvdyxTYXZlRWRpdGFibGVSb3csQ2FuY2VsRWRpdGFibGVSb3ddXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlTW9kdWxlIHsgfVxuIl19