export type IconType = {
  name: string
  tags: string[]
  svg: string
  version: string
  category: string
}

export type IconsType = IconType[]

export type DocsItem = {
  title: string
  items: {
    title: string
    href: string
    label?: string
  }[]
}

export type DocsConfigType = DocsItem[]
