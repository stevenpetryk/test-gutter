'use babel'

import MarkerItem from './marker-item'

export default class {
  constructor (editor) {
    this.editor = editor
    this.markers = []
  }

  attachTests (tests) {
    this._buildGutter()
    this._clearMarkers()
    tests.forEach((test) => this._attachTest(test))
  }

  _buildGutter (editor) {
    if (this.gutter) return

    this.gutter = this.editor.addGutter({
      name: 'test-gutter',
      priority: 200
    })
  }

  _attachTest (test) {
    const range = this.editor.getBuffer().rangeForRow(test.line_number - 1)
    const marker = this.editor.markBufferRange(range)

    this.markers.push(marker)

    this.gutter.decorateMarker(marker, {
      class: 'test-gutter-row',
      item: new MarkerItem(test).getElement()
    })
  }

  _clearMarkers () {
    this.markers.forEach((marker) => {
      marker.destroy()
    })

    this.markers = []
  }
}
