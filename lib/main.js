'use babel'

import EditorManager from './editor-manager'

export default {
  activate () {
    atom.workspace.observeTextEditors((editor) => {
      var manager = new EditorManager(editor)
      manager.run()
      manager.bindListeners()
    })
  },

  deactivate () {
    this.gutter.destroy()
  }
}
