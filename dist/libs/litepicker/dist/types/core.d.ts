/// <reference types="node" />
import { EventEmitter } from 'events';
import { DateTime } from './datetime';
import { ILPConfiguration } from './interfaces';
export declare class LPCore extends EventEmitter {
    static add(name: string, data: object): void;
    protected plugins: string[];
    protected ui: HTMLElement;
    protected datePicked: DateTime[];
    protected nextFocusElement: HTMLElement;
    protected calendars: DateTime[];
    protected readonly pluralSelector: (arg: number) => string;
    protected options: ILPConfiguration;
    constructor(options: ILPConfiguration);
    DateTime(date: any, format?: any): DateTime;
    protected init(): void;
    protected parseInput(): DateTime[];
    protected isShowning(): boolean;
    protected findPosition(element: any): {
        left: number;
        top: number;
    };
}
