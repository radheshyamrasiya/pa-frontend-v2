import { Injectable } from '@angular/core';
type StorageNumData = {dataName: string; dataValue: number;};
type StorageStrData = {dataName: string; dataValue: string;};

@Injectable()
export class NavService {
    varNumList: StorageNumData[];
    varStrList: StorageStrData[];

    constructor() {
        this.varNumList = [];
        this.varStrList = [];
    }

    setNum(key: string, value: number) {
        if (this.varNumList.find(x => x.dataName == key) != undefined) {
            this.varNumList.find(x => x.dataName == key).dataValue = value;
        } else {
            this.varNumList.push({dataName: key, dataValue: value});
        }
    }

    getNum(key: string): number {
        if (this.varNumList.find(x => x.dataName == key) == undefined) {
            return null;
        } else {
            return this.varNumList.find(x => x.dataName == key).dataValue;
        }
    }

    setStr(key: string, value: string) {
        if (this.varStrList.find(x => x.dataName == key) != undefined) {
            this.varStrList.find(x => x.dataName == key).dataValue = value;
        } else {
            this.varStrList.push({dataName: key, dataValue: value});
        }
    }

    getStr(key: string): string {
        if (this.varStrList.find(x => x.dataName == key) == undefined) {
            return null;
        } else {
            return this.varStrList.find(x => x.dataName == key).dataValue;
        }
    }
}