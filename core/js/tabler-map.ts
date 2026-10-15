// The map component ships as its own bundle, so pages without a map do not
// carry it. Load it after `tabler.js`: the UMD build adds `MapView` to the
// `tabler` global.
import './src/map'

export { default as MapView } from './src/map'
