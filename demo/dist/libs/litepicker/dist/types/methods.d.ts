import { DateTime } from './datetime';
declare module './litepicker' {
    interface Litepicker {
        show(element?: any): void;
        hide(): void;
        gotoDate(date: any, idx?: any): void;
        clearSelection(): void;
        destroy(): void;
        getDate(): DateTime | null;
        getStartDate(): DateTime | null;
        getEndDate(): DateTime | null;
        setDate(date: any): void;
        setStartDate(date: any): void;
        setEndDate(date: any): void;
        setDateRange(date1: any, date2: any): void;
        setLockDays(array: any): void;
        setHighlightedDays(array: any): void;
        setOptions(options: any): void;
    }
}
