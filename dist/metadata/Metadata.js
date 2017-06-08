"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __METADATA__ = new Map();
const __CLASS__ = Symbol("Class");
const __PROPS__ = Symbol("Props");
function getMetadata(constructor, property) {
    let metadata;
    if (!(metadata = __METADATA__.get(constructor))) {
        metadata = new Map();
        metadata.set(__CLASS__, new Map());
        metadata.set(__PROPS__, new Map());
        __METADATA__.set(constructor, metadata);
    }
    if (!property) {
        return metadata.get(__CLASS__);
    }
    if (!metadata.get(__PROPS__).get(property)) {
        metadata.get(__PROPS__).set(property, new Map());
    }
    return metadata.get(__PROPS__).get(property);
}
function getPropertyMetadata(constructor) {
    return __METADATA__.get(constructor).get(__PROPS__);
}
exports.getPropertyMetadata = getPropertyMetadata;
function getClassMetadata(constructor) {
    return __METADATA__.get(constructor).get(__CLASS__);
}
exports.getClassMetadata = getClassMetadata;
function createPropertyDecorator(name) {
    return function (value) {
        return function (type, property) {
            getMetadata(type.constructor, property).set(name, value);
        };
    };
}
exports.createPropertyDecorator = createPropertyDecorator;
function createClassDecorator(name) {
    return function (value) {
        return function (type) {
            getMetadata(type).set(name, value);
        };
    };
}
exports.createClassDecorator = createClassDecorator;
//# sourceMappingURL=Metadata.js.map