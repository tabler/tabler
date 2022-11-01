interface CssClasses {
    target: string;
    base: string;
    origin: string;
    handle: string;
    handleLower: string;
    handleUpper: string;
    touchArea: string;
    horizontal: string;
    vertical: string;
    background: string;
    connect: string;
    connects: string;
    ltr: string;
    rtl: string;
    textDirectionLtr: string;
    textDirectionRtl: string;
    draggable: string;
    drag: string;
    tap: string;
    active: string;
    tooltip: string;
    pips: string;
    pipsHorizontal: string;
    pipsVertical: string;
    marker: string;
    markerHorizontal: string;
    markerVertical: string;
    markerNormal: string;
    markerLarge: string;
    markerSub: string;
    value: string;
    valueHorizontal: string;
    valueVertical: string;
    valueNormal: string;
    valueLarge: string;
    valueSub: string;
}
export interface PartialFormatter {
    to: (value: number) => string | number;
    from?: (value: string) => number | false;
}
export interface Formatter extends PartialFormatter {
    from: (value: string) => number | false;
}
export declare enum PipsMode {
    Range = "range",
    Steps = "steps",
    Positions = "positions",
    Count = "count",
    Values = "values"
}
export declare enum PipsType {
    None = -1,
    NoValue = 0,
    LargeValue = 1,
    SmallValue = 2
}
declare type WrappedSubRange = [number] | [number, number];
declare type SubRange = number | WrappedSubRange;
interface Range {
    min: SubRange;
    max: SubRange;
    [key: `${number}%`]: SubRange;
}
interface BasePips {
    mode: PipsMode;
    density?: number;
    filter?: PipsFilter;
    format?: PartialFormatter;
}
interface PositionsPips extends BasePips {
    mode: PipsMode.Positions;
    values: number[];
    stepped?: boolean;
}
interface ValuesPips extends BasePips {
    mode: PipsMode.Values;
    values: number[];
    stepped?: boolean;
}
interface CountPips extends BasePips {
    mode: PipsMode.Count;
    values: number;
    stepped?: boolean;
}
interface StepsPips extends BasePips {
    mode: PipsMode.Steps;
}
interface RangePips extends BasePips {
    mode: PipsMode.Range;
}
declare type Pips = PositionsPips | ValuesPips | CountPips | StepsPips | RangePips;
declare type StartValues = string | number | (string | number)[];
declare type HandleAttributes = {
    [key: string]: string;
};
interface UpdatableOptions {
    range?: Range;
    start?: StartValues;
    margin?: number;
    limit?: number;
    padding?: number | number[];
    snap?: boolean;
    step?: number;
    pips?: Pips;
    format?: Formatter;
    tooltips?: boolean | PartialFormatter | (boolean | PartialFormatter)[];
    animate?: boolean;
}
export interface Options extends UpdatableOptions {
    range: Range;
    connect?: "lower" | "upper" | boolean | boolean[];
    orientation?: "vertical" | "horizontal";
    direction?: "ltr" | "rtl";
    behaviour?: string;
    keyboardSupport?: boolean;
    keyboardPageMultiplier?: number;
    keyboardMultiplier?: number;
    keyboardDefaultStep?: number;
    documentElement?: HTMLElement;
    cssPrefix?: string;
    cssClasses?: CssClasses;
    ariaFormat?: PartialFormatter;
    animationDuration?: number;
    handleAttributes?: HandleAttributes[];
}
export interface API {
    destroy: () => void;
    steps: () => NextStepsForHandle[];
    on: (eventName: string, callback: EventCallback) => void;
    off: (eventName: string) => void;
    get: (unencoded?: boolean) => GetResult;
    set: (input: number | string | (number | string)[], fireSetEvent?: boolean, exactInput?: boolean) => void;
    setHandle: (handleNumber: number, value: number | string, fireSetEvent?: boolean, exactInput?: boolean) => void;
    reset: (fireSetEvent?: boolean) => void;
    options: Options;
    updateOptions: (optionsToUpdate: UpdatableOptions, fireSetEvent: boolean) => void;
    target: HTMLElement;
    removePips: () => void;
    removeTooltips: () => void;
    getTooltips: () => {
        [handleNumber: number]: HTMLElement | false;
    };
    getOrigins: () => {
        [handleNumber: number]: HTMLElement;
    };
    pips: (grid: Pips) => HTMLElement;
}
interface TargetElement extends HTMLElement {
    noUiSlider?: API;
}
interface NearByStep {
    startValue: number;
    step: number | false;
    highestStep: number;
}
interface NearBySteps {
    stepBefore: NearByStep;
    thisStep: NearByStep;
    stepAfter: NearByStep;
}
declare type GetResult = number | string | (string | number)[];
declare type NextStepsForHandle = [number | false | null, number | false | null];
declare type PipsFilter = (value: number, type: PipsType) => PipsType;
declare type EventCallback = (this: API, values: (number | string)[], handleNumber: number, unencoded: number[], tap: boolean, locations: number[], slider: API) => void;
declare class Spectrum {
    xPct: number[];
    xVal: number[];
    xSteps: (number | false)[];
    xNumSteps: (number | false)[];
    protected xHighestCompleteStep: number[];
    protected snap: boolean;
    constructor(entry: Range, snap: boolean, singleStep: number);
    getDistance(value: number): number[];
    getAbsoluteDistance(value: number, distances: number[] | null, direction: boolean): number;
    toStepping(value: number): number;
    fromStepping(value: number): number;
    getStep(value: number): number;
    getDefaultStep(value: number, isDown: boolean, size: number): number;
    getNearbySteps(value: number): NearBySteps;
    countStepDecimals(): number;
    hasNoSize(): boolean;
    convert(value: number): number;
    private handleEntryPoint;
    private handleStepPoint;
}
declare const cssClasses: CssClasses;
declare function initialize(target: TargetElement, originalOptions: Options): API;
export { TargetElement as target };
export { initialize as create };
export { cssClasses };
declare const _default: {
    __spectrum: typeof Spectrum;
    cssClasses: CssClasses;
    create: typeof initialize;
};
export default _default;
