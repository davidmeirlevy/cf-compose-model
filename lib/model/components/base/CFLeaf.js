'use strict';

const Base = require('./Base');
const _ = require('lodash');

class CFLeaf extends Base {

    constructor(parentFieldName){
        super();
        this._parentFieldName = parentFieldName;
    }

    set stringValue(newValue){
        this._stringValue = newValue;
    }

    get stringValue(){
        return this._stringValue;
    }

    set parent(newValue){
        this._parentFieldName = newValue;
    }

    get parent(){
        return this._parentFieldName;
    }

    toString() {
        return `${this._stringValue}`;
    }

    fixWarnings(onlyAutoFix) {
        _.forEach(this.warnings, warning => {
            if(!onlyAutoFix || (onlyAutoFix && warning.autoFix))
            this._fixWarning(warning);
        });
    }

    getWarnings(possibleViolations) {
        this.warnings = [];
        possibleViolations = possibleViolations || [];
        _.forEach(possibleViolations, (violation) => {
            const warning = this._createWarning(violation);
            if (warning) {
                this.warnings.push(warning);
            }
        });

        return this.warnings;
    }

    _fixWarning(){}

}

module.exports = CFLeaf;