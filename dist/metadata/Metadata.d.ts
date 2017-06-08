export declare type Constructor = new (...args: any[]) => {};
export declare function getPropertyMetadata(constructor: Constructor): any;
export declare function getClassMetadata(constructor: Constructor): any;
export declare function createPropertyDecorator<T>(name: string): (value: T) => (type: any, property: PropertyDescriptor) => void;
export declare function createClassDecorator<T>(name: string): (value: T) => (type: any) => void;
