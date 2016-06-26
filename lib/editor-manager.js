'use babel'

import GutterManager from './gutter-manager'

export default class {
  constructor (getTestRunner, editor) {
    this.getTestRunner = getTestRunner
    this.editor = editor
    this.gutterManager = new GutterManager(editor)

    this.markers = []
  }

  run () {
    if (!this.getTestRunner()) return

    this.getTestRunner().test(this.editor).then((examples) => {
      this._attachTests(examples)
    })
  }

  bindListeners () {
    this.editor.onDidSave(() => this.run())
  }

  _attachTests (examples) {
    this.gutterManager.attachTests(examples)
  }
}
