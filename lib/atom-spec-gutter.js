'use babel'

import SpecRunner from './spec-runner'

export default {
  specRunner: null,
  editor: null,
  gutter: null,

  activate () {
    this.specRunner = new SpecRunner(this)

    atom.workspace.observeTextEditors((editor) => {
      var gutter = editor.addGutter({
        name: 'spec-gutter',
        priority: 200
      })
      var file = editor.buffer.file.path
      editor.onDidSave(() => this.specRunner.runSpec(editor, gutter, file))
      this.specRunner.runSpec(editor, gutter, file)
    })
  },

  deactivate () {
    this.gutter.destroy()
  }
}
