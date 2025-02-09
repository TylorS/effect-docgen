/**
 * @since 1.0.0
 */
import { Option, Order, pipe, ReadonlyArray, ReadonlyRecord, String } from "effect"
import * as Prettier from "prettier"
import type * as Domain from "./Domain"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const toc = require("markdown-toc")

type Printable =
  | Domain.Class
  | Domain.Constant
  | Domain.Export
  | Domain.Function
  | Domain.Interface
  | Domain.TypeAlias
  | Domain.Namespace

const bold = (s: string) => `**${s}**`

const fence = (language: string, content: string) =>
  "```" + language + "\n" + content + "\n" + "```\n\n"

const paragraph = (...content: ReadonlyArray<string>) => "\n" + content.join("") + "\n\n"

const strikethrough = (content: string) => `~~${content}~~`

const createHeader = (level: number) => (content: string): string =>
  "#".repeat(level) + " " + content + "\n\n"

const h1 = createHeader(1)

const h2 = createHeader(2)

const h3 = createHeader(3)

const h4 = createHeader(4)

const getSince: (v: Option.Option<string>) => string = Option.match({
  onNone: () => "",
  onSome: (v) => paragraph(`Added in v${v}`)
})

const getTitle = (s: string, deprecated: boolean, type?: string): string => {
  const name = s.trim() === "hasOwnProperty" ? `${s} (function)` : s
  const title = deprecated ? strikethrough(name) : name
  return Option.fromNullable(type).pipe(
    Option.match({
      onNone: () => title,
      onSome: (t) => title + ` ${t}`
    })
  )
}

const getDescription = (d: Option.Option<string>): string =>
  paragraph(Option.getOrElse(d, () => ""))

const getSignature = (s: string): string => paragraph(bold("Signature")) + paragraph(fence("ts", s))

const getSignatures = (ss: ReadonlyArray<string>): string =>
  paragraph(bold("Signature")) + paragraph(fence("ts", ss.join("\n")))

const getExamples = (es: ReadonlyArray<string>): string =>
  es
    .map((code) => paragraph(bold("Example")) + paragraph(fence("ts", code)))
    .join("\n\n")

const getStaticMethod = (m: Domain.Method): string =>
  paragraph(
    h3(getTitle(m.name, m.deprecated, "(static method)")),
    getDescription(m.description),
    getSignatures(m.signatures),
    getExamples(m.examples),
    getSince(m.since)
  )

const getMethod = (m: Domain.Method): string =>
  paragraph(
    h3(getTitle(m.name, m.deprecated, "(method)")),
    getDescription(m.description),
    getSignatures(m.signatures),
    getExamples(m.examples),
    getSince(m.since)
  )

const getProperty = (p: Domain.Property): string =>
  paragraph(
    h3(getTitle(p.name, p.deprecated, "(property)")),
    getDescription(p.description),
    getSignature(p.signature),
    getExamples(p.examples),
    getSince(p.since)
  )

const getStaticMethods = (methods: ReadonlyArray<Domain.Method>): string =>
  ReadonlyArray.map(methods, (method) => getStaticMethod(method) + "\n\n").join("")

const getMethods = (methods: ReadonlyArray<Domain.Method>): string =>
  ReadonlyArray.map(methods, (method) => getMethod(method) + "\n\n").join("")

const getProperties = (properties: ReadonlyArray<Domain.Property>): string =>
  ReadonlyArray.map(
    properties,
    (property) => getProperty(property) + "\n\n"
  ).join("")

const getModuleDescription = (module: Domain.Module): string =>
  paragraph(
    h2(getTitle(module.name, module.deprecated, "overview")),
    getDescription(module.description),
    getExamples(module.examples),
    getSince(module.since)
  )

const getMeta = (title: string, order: number): string =>
  paragraph(
    "---",
    `\n`,
    `title: ${title}`,
    `\n`,
    `nav_order: ${order}`,
    `\n`,
    `parent: Modules`,
    `\n`,
    "---"
  )

const fromClass = (c: Domain.Class): string =>
  paragraph(
    paragraph(
      h2(getTitle(c.name, c.deprecated, "(class)")),
      getDescription(c.description),
      getSignature(c.signature),
      getExamples(c.examples),
      getSince(c.since)
    ),
    getStaticMethods(c.staticMethods),
    getMethods(c.methods),
    getProperties(c.properties)
  )

const fromConstant = (c: Domain.Constant): string =>
  paragraph(
    h2(getTitle(c.name, c.deprecated)),
    getDescription(c.description),
    getSignature(c.signature),
    getExamples(c.examples),
    getSince(c.since)
  )

const fromExport = (e: Domain.Export): string =>
  paragraph(
    h2(getTitle(e.name, e.deprecated)),
    getDescription(e.description),
    getSignature(e.signature),
    getExamples(e.examples),
    getSince(e.since)
  )

const fromFunction = (f: Domain.Function): string =>
  paragraph(
    h2(getTitle(f.name, f.deprecated)),
    getDescription(f.description),
    getSignatures(f.signatures),
    getExamples(f.examples),
    getSince(f.since)
  )

const fromInterface = (i: Domain.Interface, indentation: number): string =>
  paragraph(
    getHeaderByIndentation(indentation)(getTitle(i.name, i.deprecated, "(interface)")),
    getDescription(i.description),
    getSignature(i.signature),
    getExamples(i.examples),
    getSince(i.since)
  )

const fromTypeAlias = (ta: Domain.TypeAlias, indentation: number): string =>
  paragraph(
    getHeaderByIndentation(indentation)(getTitle(ta.name, ta.deprecated, "(type alias)")),
    getDescription(ta.description),
    getSignature(ta.signature),
    getExamples(ta.examples),
    getSince(ta.since)
  )

const getHeaderByIndentation = (indentation: number) => {
  switch (indentation) {
    case 0:
      return h2
    case 1:
      return h3
    case 2:
      return h4
  }
  throw new Error(`Unsupported namespace nesting: ${indentation + 1}`)
}

const fromNamespace = (ns: Domain.Namespace, indentation: number): string =>
  paragraph(
    paragraph(
      getHeaderByIndentation(indentation)(getTitle(ns.name, ns.deprecated, "(namespace)")),
      getDescription(ns.description),
      getExamples(ns.examples),
      getSince(ns.since)
    ),
    ReadonlyArray.map(ns.interfaces, (i) => fromInterface(i, indentation + 1) + "\n\n").join(""),
    ReadonlyArray.map(ns.typeAliases, (typeAlias) =>
      fromTypeAlias(typeAlias, indentation + 1) + "\n\n").join(""),
    ReadonlyArray.map(ns.namespaces, (namespace) =>
      fromNamespace(namespace, indentation + 1) + "\n\n").join("")
  )

/** @internal */
export const fromPrintable = (p: Printable): string => {
  switch (p._tag) {
    case "Class":
      return fromClass(p)
    case "Constant":
      return fromConstant(p)
    case "Export":
      return fromExport(p)
    case "Function":
      return fromFunction(p)
    case "Interface":
      return fromInterface(p, 0)
    case "TypeAlias":
      return fromTypeAlias(p, 0)
    case "Namespace":
      return fromNamespace(p, 0)
  }
}

const getPrintables = (module: Domain.Module): ReadonlyArray<Printable> =>
  ReadonlyArray.flatten<Printable>([
    module.classes,
    module.constants,
    module.exports,
    module.functions,
    module.interfaces,
    module.typeAliases,
    module.namespaces
  ])

/**
 * @category printers
 * @since 1.0.0
 */
export const printModule = (module: Domain.Module, order: number): string => {
  const DEFAULT_CATEGORY = "utils"

  const header = getMeta(module.path.slice(1).join("/"), order)

  const description = paragraph(getModuleDescription(module))

  const content = pipe(
    getPrintables(module),
    ReadonlyArray.groupBy(({ category }) => Option.getOrElse(category, () => DEFAULT_CATEGORY)),
    ReadonlyRecord.toEntries,
    ReadonlyArray.sort(
      Order.mapInput(String.Order, ([category]: [string, unknown]) => category)
    ),
    ReadonlyArray.map(([category, printables]) =>
      [
        h1(category),
        ...pipe(
          printables,
          ReadonlyArray.sort(
            Order.mapInput(
              String.Order,
              (printable: Printable) => printable.name
            )
          ),
          ReadonlyArray.map(fromPrintable)
        )
      ].join("\n")
    )
  ).join("\n")

  const tableOfContents = (content: string) =>
    "<h2 class=\"text-delta\">Table of contents</h2>\n\n"
    + toc(content).content
    + "\n\n"

  return prettify(
    [
      header,
      description,
      "---\n",
      tableOfContents(content),
      "---\n",
      content
    ].join("\n")
  )
}

const defaultPrettierOptions: Prettier.Options = {
  parser: "markdown",
  semi: false,
  singleQuote: true,
  printWidth: 120
}

/** @internal */
export const prettify = (s: string): string => Prettier.format(s, defaultPrettierOptions)
