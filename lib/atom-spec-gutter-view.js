'use babel'

import SpecRunner from './spec-runner'

export default class {
  constructor (editor) {
    this.editor = editor
    if (!this._isRSpec()) return

    this._initGutter()
    this.file = this.editor.buffer.file.path
    this.specRunner = new SpecRunner(atom.workspace.project.getPaths()[0])
    this.markers = []

    this._run()
    this._bindListeners()
  }

  _initGutter () {
    this.gutter = this.editor.addGutter({
      name: 'spec-gutter',
      priority: 200
    })
  }

  _bindListeners () {
    this.editor.onDidSave(() => this._run())
  }

  _clearMarkers () {
    this.markers.forEach((marker) => {
      marker.destroy()
    })

    this.markers = []
  }

  _run () {
    this.specRunner.runSpec(this.file, (examples) => {
      this._clearMarkers()
      this._attachExamples(examples)
    })
  }

  _attachExamples (examples) {
    examples.forEach((example) => this._attachExampleToLine(example))
  }

  _attachExampleToLine (example) {
    var range = this.editor.getBuffer().rangeForRow(example.line_number - 1)
    var marker = this.editor.markBufferRange(range)

    this.markers.push(marker)

    this.gutter.decorateMarker(marker, {
      class: 'spec-gutter-row',
      item: this._createMarkerItem(example)
    })
  }

  _createMarkerItem (example) {
    const element = document.createElement('span')
    element.className = `spec-gutter spec-gutter-highlight status-${example.status}`
    return element
  }

  _isRSpec () {
    return this.editor.getGrammar().name === 'RSpec'
  }
}
