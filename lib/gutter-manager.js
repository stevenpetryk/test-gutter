'use babel'

import MarkerItem from './marker-item'

export default class {
  constructor (editor) {
    this.editor = editor
    this.markers = []
  }

  attachExamples (examples) {
    this._buildGutter()
    this._clearMarkers()
    examples.forEach((example) => this._attachExample(example))
  }

  _buildGutter (editor) {
    if (this.gutter) return

    this.gutter = this.editor.addGutter({
      name: 'spec-gutter',
      priority: 200
    })
  }

  _attachExample (example) {
    const range = this.editor.getBuffer().rangeForRow(example.line_number - 1)
    const marker = this.editor.markBufferRange(range)

    this.markers.push(marker)

    this.gutter.decorateMarker(marker, {
      class: 'spec-gutter-row',
      item: new MarkerItem(example).getElement()
    })
  }

  _clearMarkers () {
    this.markers.forEach((marker) => {
      marker.destroy()
    })

    this.markers = []
  }
}
