import { DateTime } from './datetime';
import { Litepicker } from './litepicker';
interface ILPOptionDropdowns {
    minYear: number;
    maxYear: number | null;
    months: boolean;
    years: boolean | string;
}
interface ILPOptionButtonText {
    apply: string;
    cancel: string;
    previousMonth: string;
    nextMonth: string;
    reset: string;
}
interface ILPOptionTooltip {
    one: string;
    other: string;
    many?: string;
}
export interface ILPConfiguration {
    element: HTMLElement | HTMLInputElement;
    elementEnd?: HTMLElement | HTMLInputElement | null;
    parentEl?: HTMLElement | null;
    firstDay?: number;
    format?: string | object;
    lang?: string;
    delimiter?: string;
    numberOfMonths?: number;
    numberOfColumns?: number;
    startDate?: DateTime | Date | string | number;
    endDate?: DateTime | Date | string | number;
    zIndex?: number;
    minDate?: DateTime | Date | string | number;
    maxDate?: DateTime | Date | string | number;
    minDays?: number;
    maxDays?: number;
    switchingMonths?: number | null;
    selectForward?: boolean;
    selectBackward?: boolean;
    splitView?: boolean;
    inlineMode?: boolean;
    singleMode?: boolean;
    autoApply?: boolean;
    allowRepick?: boolean;
    showWeekNumbers?: boolean;
    showTooltip?: boolean;
    scrollToDate?: boolean;
    mobileFriendly?: boolean;
    resetButton?: boolean | object;
    autoRefresh?: boolean;
    lockDaysFormat?: string;
    lockDays?: any[];
    disallowLockDaysInRange?: boolean;
    lockDaysInclusivity?: string;
    lockDaysFilter?: (date1: DateTime | null, date2: DateTime | null, totalPicked: number) => boolean;
    highlightedDaysFormat?: string;
    highlightedDays?: any[];
    dropdowns?: ILPOptionDropdowns;
    buttonText?: ILPOptionButtonText;
    tooltipText?: ILPOptionTooltip;
    tooltipPluralSelector?: (arg: number) => string;
    footerHTML?: string | null;
    setup?: (picker: Litepicker) => void;
    tooltipNumber?: (totalDays: number) => number;
    plugins?: string[];
    position?: string;
    ranges?: {
        position?: string;
        customRanges?: object;
        force?: boolean;
    };
    multiselect?: {
        max?: number | null;
    };
    keyboardnav?: {
        firstTabIndex?: number;
    };
}
export {};
