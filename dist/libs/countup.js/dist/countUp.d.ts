export interface CountUpOptions {
    startVal?: number;
    decimalPlaces?: number;
    duration?: number;
    useGrouping?: boolean;
    useEasing?: boolean;
    smartEasingThreshold?: number;
    smartEasingAmount?: number;
    separator?: string;
    decimal?: string;
    easingFn?: (t: number, b: number, c: number, d: number) => number;
    formattingFn?: (n: number) => string;
    prefix?: string;
    suffix?: string;
    numerals?: string[];
    enableScrollSpy?: boolean;
    scrollSpyDelay?: number;
    scrollSpyOnce?: boolean;
}
export declare class CountUp {
    private endVal;
    options?: CountUpOptions;
    version: string;
    private defaults;
    private el;
    private rAF;
    private startTime;
    private remaining;
    private finalEndVal;
    private useEasing;
    private countDown;
    formattingFn: (num: number) => string;
    easingFn?: (t: number, b: number, c: number, d: number) => number;
    callback: (args?: any) => any;
    error: string;
    startVal: number;
    duration: number;
    paused: boolean;
    frameVal: number;
    once: boolean;
    constructor(target: string | HTMLElement | HTMLInputElement, endVal: number, options?: CountUpOptions);
    handleScroll(self: CountUp): void;
    /**
     * Smart easing works by breaking the animation into 2 parts, the second part being the
     * smartEasingAmount and first part being the total amount minus the smartEasingAmount. It works
     * by disabling easing for the first part and enabling it on the second part. It is used if
     * usingEasing is true and the total animation amount exceeds the smartEasingThreshold.
     */
    private determineDirectionAndSmartEasing;
    start(callback?: (args?: any) => any): void;
    pauseResume(): void;
    reset(): void;
    update(newEndVal: string | number): void;
    count: (timestamp: number) => void;
    printValue(val: number): void;
    ensureNumber(n: any): boolean;
    validateValue(value: string | number): number;
    private resetDuration;
    formatNumber: (num: number) => string;
    easeOutExpo: (t: number, b: number, c: number, d: number) => number;
}
