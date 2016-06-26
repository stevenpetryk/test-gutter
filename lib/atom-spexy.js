'use babel'

import { CompositeDisposable } from 'atom'
import SpecRunner from './spec-runner'

export default {
  subscriptions: null,
  specRunner: null,
  editor: null,
  gutter: null,

  activate () {
    this.subscriptions = new CompositeDisposable()
    this.specRunner = new SpecRunner(this)

    atom.workspace.observeTextEditors((editor) => {
      var gutter = editor.addGutter({
        name: 'spexy',
        priority: 200
      })
      var file = editor.buffer.file.path
      editor.onDidSave(() => this.specRunner.runSpec(editor, gutter, file))
      this.specRunner.runSpec(editor, gutter, file)
    })

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-spexy:toggle': () => this.toggle()
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
    this.gutter.destroy()
  },

  toggle () {

  }
}
