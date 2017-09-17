/**
 * Simple implementation of a metadata system for decorators, similar to Reclect.metadata.
 * It allow the use of decorators to store metadata about classes and properties.
 */

export type Constructor = new(...args: any[]) => {};

// The global metadata storage
const __METADATA__ = new Map();
const __CLASS__ = Symbol("Class");
const __PROPS__ = Symbol("Props");

// Returns a reference to the metadata storage for the given class and property
// Internal use only
function getMetadata(constructor: Constructor, property?: PropertyDescriptor): Map<any, any> {
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

/**
 * Get the property portion of the metadata for a given class
 * @param constructor
 */
export function getPropertyMetadata(constructor: Constructor) {
    return __METADATA__.get(constructor).get(__PROPS__);
}

/**
 * Get the class portion of the metadata for a given class
 * @param constructor
 */
export function getClassMetadata(constructor: Constructor) {
    return __METADATA__.get(constructor).get(__CLASS__);
}

/**
 * Create property decorators, e.g.
 * const exported = createPropertyDecorator<boolean>("exported");
 * class Test {
 *   @exported(true)
 *   value: string;
 * }
 * const isExported = getMetadata(Test).get("value").get("exported");
 * @param name
 */
export function createPropertyDecorator<T>(name: string) {
    return function (value: T) {
        return function (type: any, property: any) {
            getMetadata(type.constructor, property as PropertyDescriptor).set(name, value);
        }
    }
}

/**
 * Create class decorators, e.g.
 * const serializedName = createPropertyDecorator<string>("serializedName");
 * @serializedName("test")
 * class Test {
 * }
 * const name = getMetadata(Test).get("serializedName");
 * @param name
 */

export function createClassDecorator<T>(name: string) {
    return function (value: T) {
        return function (type: any) {
            getMetadata(type).set(name, value);
        }
    }
}