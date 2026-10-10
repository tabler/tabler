// The vector map ships as its own bundle, so pages without a map do not carry
// it. Load it after `tabler.js`: the UMD build adds `VectorMap` to the `tabler`
// global. The maps themselves are separate files in `dist/js/maps/`.
import './src/vector-map'

export { default as VectorMap } from './src/vector-map'
export type { VectorMapData, VectorMapLine, VectorMapMarker, VectorMapRegion, VectorMapTooltipItem } from './src/vector-map'
