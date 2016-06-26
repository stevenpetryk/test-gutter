'use babel'

import GutterManager from './gutter-manager'
import SpecRunner from './spec-runner'

export default class {
  constructor (editor) {
    this.editor = editor
    this.gutterManager = new GutterManager(editor)

    this.file = this.editor.buffer.file.path
    this.specRunner = new SpecRunner(atom.workspace.project.getPaths()[0])
    this.markers = []
  }

  run () {
    if (!this._isRSpec()) return

    this.specRunner.runSpec(this.file, (examples) => {
      this._attachExamples(examples)
    })
  }

  bindListeners () {
    this.editor.onDidSave(() => this.run())
  }

  _attachExamples (examples) {
    this.gutterManager.attachExamples(examples)
  }

  _isRSpec () {
    return this.editor.getGrammar().name === 'RSpec'
  }
}
