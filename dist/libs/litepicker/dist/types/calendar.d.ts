import { LPCore } from './core';
import { DateTime } from './datetime';
import { ILPConfiguration } from './interfaces';
export declare class Calendar extends LPCore {
    constructor(options: ILPConfiguration);
    protected render(): void;
    protected renderMonth(date: DateTime, calendarIdx: number): HTMLDivElement;
    protected renderDay(date: DateTime): HTMLDivElement;
    protected renderFooter(): HTMLDivElement;
    protected renderWeekNumber(date: any): HTMLDivElement;
    protected renderTooltip(): HTMLDivElement;
    private weekdayName;
    private calcSkipDays;
}
