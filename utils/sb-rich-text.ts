import { h } from 'vue'

export enum NodeTypes {
  // Blocks
  DOCUMENT = 'doc',
  HEADING = 'heading',
  PARAGRAPH = 'paragraph',
  QUOTE = 'blockquote',
  OL_LIST = 'ordered_list',
  UL_LIST = 'bullet_list',
  LIST_ITEM = 'list_item',
  CODE_BLOCK = 'code_block',
  HR = 'horizontal_rule',
  BR = 'hard_break',
  IMAGE = 'image',
  EMOJI = 'emoji',
  // Marks
  BOLD = 'bold',
  STRONG = 'strong',
  STRIKE = 'strike',
  UNDERLINE = 'underline',
  ITALIC = 'italic',
  CODE = 'code',
  LINK = 'link',
  ANCHOR = 'anchor',
  STYLED = 'styled',
  SUPERSCRIPT = 'superscript',
  SUBSCRIPT = 'subscript',
  TEXT_STYLE = 'textStyle',
  HIGHLIGHT = 'highlight',
  // Text
  TEXT = 'text',
  // Component
  COMPONENT = 'blok',
}

export interface SbRichtextOptions {
  resolvers?: Array<[NodeTypes, (node: any) => any]>
}

const resolvers = new Map<NodeTypes, (node: any) => any>([
  [NodeTypes.DOCUMENT, ({ children }) => children.map(child => render(child))],
  [NodeTypes.HEADING, ({ children, attrs }) => h(`h${attrs.level}`, {}, children.map(child => render(child)))],
  [NodeTypes.PARAGRAPH, ({ children }) => h('p', {}, children.map(child => render(child)))],
  // ... other resolvers
  [NodeTypes.IMAGE, ({ attrs }) => h('img', { ...attrs })],
// ... other resolvers
])

export function render(node, options: SbRichtextOptions = {
  resolvers: [],
} ) {
  const customResolversArray = options.resolvers || []
  
  const mergedResolvers = new Map([
    ...Array.from(resolvers.entries()),
    ...customResolversArray,
  ])

  const resolver = mergedResolvers.get(node.type)
  if (!resolver) {
    throw new Error(`No resolver found for node type: ${node.type}`)
  }
  return resolver(node)
}