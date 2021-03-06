'use strict';
/*jslint latedef:false*/
const Warning     = require('./../../ComposeWarning');
const CFLeaf      = require('./../base').CFLeaf;

class Port extends CFLeaf {
    constructor(portData) {
        super('ports');
        if(portData) {
            this._source   = portData.source;
            this._target   = portData.target;
            this._protocol = portData.protocol;
        }
    }

    _createWarning(type) {
        const cases = {
            'NO_PERMISSION': () => {
                if (this.getSource()) {
                    return new Warning(type.name, `${this.getSource()}:${this.getTarget()} ${this.getProtocol() ?
                    '/' + this.getProtocol() : ''}`, `${this.getTarget()}`);
                }
            }
        };
        if (cases[type.name]) {
            return cases[type.name]();
        }
    }

    _fixWarning(type) {
        const cases = {
            'NO_PERMISSION': () => {
                this.setSource(undefined);
            }
        };

        if (cases[type.name]) {
            cases[type.name]();
        }
    }

    static parse(stringValue) {
        const ports = stringValue.split(':');
        let source;
        let target;
        let protocol;
        if (ports.length === 1) {
            let targetWithProtocol = ports[0].split('/');
            target                 = targetWithProtocol[0];
        } else if (ports.length === 3) {
            source               = `${ports[0]}:${ports[1]}`;
            let targetWithSource = ports[1].split('/');
            target               = targetWithSource[0];
            protocol             = targetWithSource[1];
        } else {
            source               = ports[0];
            let targetWithSource = ports[1].split('/');
            target               = targetWithSource[0];
            protocol             = targetWithSource[1];
        }

        return new Port({
            source: source,
            target: target,
            protocol: protocol
        });
    }

    getTarget(){
        return this._target;
    }

    setTarget(target){
        this._target = target;
        return this;
    }

    getSource(){
        return this._source;
    }

    setSource(source){
        this._source = source;
        return this;
    }

    getProtocol(){
        return this._protocol;
    }

    setProtocol(protocol){
        this._protocol = protocol;
        return this;
    }
}


module.exports = Port;