interface PostFrontmatter {
  title: string,
  description: string,
  dates: {
    publish: string,
    edited?: string
  },
  tags?: string[]
}

export type {
  PostFrontmatter
}
