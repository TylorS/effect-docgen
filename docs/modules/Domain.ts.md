---
title: Domain.ts
nav_order: 5
parent: Modules
---

## Domain overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [createClass](#createclass)
  - [createConstant](#createconstant)
  - [createDocumentable](#createdocumentable)
  - [createExport](#createexport)
  - [createFunction](#createfunction)
  - [createInterface](#createinterface)
  - [createMethod](#createmethod)
  - [createModule](#createmodule)
  - [createNamespace](#createnamespace)
  - [createProperty](#createproperty)
  - [createTypeAlias](#createtypealias)
- [instances](#instances)
  - [Order](#order)
- [model](#model)
  - [Class (interface)](#class-interface)
  - [Constant (interface)](#constant-interface)
  - [Documentable (interface)](#documentable-interface)
  - [Example (type alias)](#example-type-alias)
  - [Export (interface)](#export-interface)
  - [Function (interface)](#function-interface)
  - [Interface (interface)](#interface-interface)
  - [Method (interface)](#method-interface)
  - [Module (interface)](#module-interface)
  - [Namespace (interface)](#namespace-interface)
  - [Property (interface)](#property-interface)
  - [TypeAlias (interface)](#typealias-interface)

---

# constructors

## createClass

**Signature**

```ts
export declare const createClass: (
  documentable: Documentable,
  signature: string,
  methods: ReadonlyArray<Method>,
  staticMethods: ReadonlyArray<Method>,
  properties: ReadonlyArray<Property>
) => Class
```

Added in v1.0.0

## createConstant

**Signature**

```ts
export declare const createConstant: (documentable: Documentable, signature: string) => Constant
```

Added in v1.0.0

## createDocumentable

**Signature**

```ts
export declare const createDocumentable: (
  name: string,
  description: Option.Option<string>,
  since: Option.Option<string>,
  deprecated: boolean,
  examples: ReadonlyArray<Example>,
  category: Option.Option<string>
) => Documentable
```

Added in v1.0.0

## createExport

**Signature**

```ts
export declare const createExport: (documentable: Documentable, signature: string) => Export
```

Added in v1.0.0

## createFunction

**Signature**

```ts
export declare const createFunction: (documentable: Documentable, signatures: ReadonlyArray<string>) => Function
```

Added in v1.0.0

## createInterface

**Signature**

```ts
export declare const createInterface: (documentable: Documentable, signature: string) => Interface
```

Added in v1.0.0

## createMethod

**Signature**

```ts
export declare const createMethod: (documentable: Documentable, signatures: ReadonlyArray<string>) => Method
```

Added in v1.0.0

## createModule

**Signature**

```ts
export declare const createModule: (
  documentable: Documentable,
  path: ReadonlyArray<string>,
  classes: ReadonlyArray<Class>,
  interfaces: ReadonlyArray<Interface>,
  functions: ReadonlyArray<Function>,
  typeAliases: ReadonlyArray<TypeAlias>,
  constants: ReadonlyArray<Constant>,
  exports: ReadonlyArray<Export>,
  namespaces: ReadonlyArray<Namespace>
) => Module
```

Added in v1.0.0

## createNamespace

**Signature**

```ts
export declare const createNamespace: (
  documentable: Documentable,
  interfaces: ReadonlyArray<Interface>,
  typeAliases: ReadonlyArray<TypeAlias>,
  namespaces: ReadonlyArray<Namespace>
) => Namespace
```

Added in v1.0.0

## createProperty

**Signature**

```ts
export declare const createProperty: (documentable: Documentable, signature: string) => Property
```

Added in v1.0.0

## createTypeAlias

**Signature**

```ts
export declare const createTypeAlias: (documentable: Documentable, signature: string) => TypeAlias
```

Added in v1.0.0

# instances

## Order

**Signature**

```ts
export declare const Order: order.Order<Module>
```

Added in v1.0.0

# model

## Class (interface)

**Signature**

```ts
export interface Class extends Documentable {
  readonly _tag: 'Class'
  readonly signature: string
  readonly methods: ReadonlyArray<Method>
  readonly staticMethods: ReadonlyArray<Method>
  readonly properties: ReadonlyArray<Property>
}
```

Added in v1.0.0

## Constant (interface)

**Signature**

```ts
export interface Constant extends Documentable {
  readonly _tag: 'Constant'
  readonly signature: string
}
```

Added in v1.0.0

## Documentable (interface)

**Signature**

```ts
export interface Documentable {
  readonly name: string
  readonly description: Option.Option<string>
  readonly since: Option.Option<string>
  readonly deprecated: boolean
  readonly examples: ReadonlyArray<Example>
  readonly category: Option.Option<string>
}
```

Added in v1.0.0

## Example (type alias)

**Signature**

```ts
export type Example = string
```

Added in v1.0.0

## Export (interface)

These are manual exports, like:

```ts
const _null = ...

export {
  _null as null
}
```

**Signature**

```ts
export interface Export extends Documentable {
  readonly _tag: 'Export'
  readonly signature: string
}
```

Added in v1.0.0

## Function (interface)

**Signature**

```ts
export interface Function extends Documentable {
  readonly _tag: 'Function'
  readonly signatures: ReadonlyArray<string>
}
```

Added in v1.0.0

## Interface (interface)

**Signature**

```ts
export interface Interface extends Documentable {
  readonly _tag: 'Interface'
  readonly signature: string
}
```

Added in v1.0.0

## Method (interface)

**Signature**

```ts
export interface Method extends Documentable {
  readonly signatures: ReadonlyArray<string>
}
```

Added in v1.0.0

## Module (interface)

**Signature**

```ts
export interface Module extends Documentable {
  readonly path: ReadonlyArray<string>
  readonly classes: ReadonlyArray<Class>
  readonly interfaces: ReadonlyArray<Interface>
  readonly functions: ReadonlyArray<Function>
  readonly typeAliases: ReadonlyArray<TypeAlias>
  readonly constants: ReadonlyArray<Constant>
  readonly exports: ReadonlyArray<Export>
  readonly namespaces: ReadonlyArray<Namespace>
}
```

Added in v1.0.0

## Namespace (interface)

**Signature**

```ts
export interface Namespace extends Documentable {
  readonly _tag: 'Namespace'
  readonly interfaces: ReadonlyArray<Interface>
  readonly typeAliases: ReadonlyArray<TypeAlias>
  readonly namespaces: ReadonlyArray<Namespace>
}
```

Added in v1.0.0

## Property (interface)

**Signature**

```ts
export interface Property extends Documentable {
  readonly signature: string
}
```

Added in v1.0.0

## TypeAlias (interface)

**Signature**

```ts
export interface TypeAlias extends Documentable {
  readonly _tag: 'TypeAlias'
  readonly signature: string
}
```

Added in v1.0.0
