const layers = new Set<HTMLElement>()

export function registerLayer(node: HTMLElement): () => void {
  layers.add(node)
  return () => {
    layers.delete(node)
  }
}

export function isInLayer(target: Node | null): boolean {
  if (!target) return false
  for (const node of layers) {
    if (node.contains(target)) return true
  }
  return false
}
