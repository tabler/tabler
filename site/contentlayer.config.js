import { defineDocumentType, makeSource } from "contentlayer/source-files"

import { remarkPlugins } from './mdx/remark'
import { rehypePlugins } from './mdx/rehype'
import { recmaPlugins } from './mdx/recma'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  }
}

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
    bootstrapLink: {
      type: "string",
    },
    libs: {
      type: "string"
    },
    banner: {
      type: "string"
    },
    plugin: {
      type: "string"
    },
    new: {
      type: "boolean",
      default: false,
    }
  },
  computedFields
}))

export const Guide = defineDocumentType(() => ({
  name: "Guide",
  filePathPattern: `guides/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    featured: {
      type: "boolean",
      default: false,
    },
    seoTitle: {
      type: "string",
    },
    imageTitle: {
      type: "string",
    },
    summary: {
      type: "string",
    },
    imageEmail: {
      type: "string",
    },
    done: {
      type: "boolean",
      default: false,
    },
    image: {
      type: "string",
    },
    tags: {
      type: "list",
      of: { type: "string" },
      default: [],
    }
  },
  computedFields
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: false,
    },
    summary: {
      type: "string",
    },
    product: {
      type: "string",
    },
    author: {
      type: "string",
      required: false,
      default: "codecalm",
    },
    video: {
      type: "string",
    },
    keywords: {
      type: "list",
      of: { type: "string" },
      default: [],

    }
  },
  computedFields,
}))

export const Changelog = defineDocumentType(() => ({
  name: "Changelog",
  filePathPattern: `changelog/*.mdx`,
  contentType: "mdx",
  fields: {
    date: {
      type: "date",
      required: true,
    },
    version: {
      type: "string",
      required: true,
    },
    title: {
      type: "string"
    },
  },
}))

// export const Author = defineDocumentType(() => ({
//   name: "Author",
//   filePathPattern: `authors/**/*.mdx`,
//   contentType: "mdx",
//   fields: {
//     title: {
//       type: "string",
//       required: true,
//     },
//     description: {
//       type: "string",
//     },
//     avatar: {
//       type: "string",
//       required: true,
//     },
//     twitter: {
//       type: "string",
//       required: true,
//     },
//   },
//   computedFields,
// }))

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    bodyClassName: {
      type: "string",
    },
    robots: {
      type: "string",
      default: null
    },
    hidden: {
      type: "boolean",
      default: false,
    }
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  contentDirExclude: ["docs/menu.json", "docs/.DS_Store"],
  documentTypes: [
    Page,
    Doc,
    Guide,
    Post,
    Changelog,
    // Author
  ],
  mdx: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})
