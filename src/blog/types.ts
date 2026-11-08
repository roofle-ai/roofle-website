export type Table = { head: string[]; rows: string[][]; note?: string }
export type Img = { src: string; alt: string; caption?: string }
export type Post = { slug: string; title: string; date: string; description: string; body: (string | Table | Img)[] }

// Code block helper: sh`cmd` renders as a fenced code block.
export const sh = (s: TemplateStringsArray) => '```\n' + s.raw[0] + '\n```'
