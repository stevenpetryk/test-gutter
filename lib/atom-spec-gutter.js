'use babel'

import AtomSpecGutterView from './atom-spec-gutter-view'

export default {
  activate () {
    atom.workspace.observeTextEditors((editor) => {
      new AtomSpecGutterView(editor)
    })
  },

  deactivate () {
    this.gutter.destroy()
  }
}
