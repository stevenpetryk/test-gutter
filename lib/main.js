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
  },

  config: {
    command: {
      type: 'string',
      title: 'RSpec Command',
      description: `The command to run to run your specs. \`%f\` will be interpolated with the spec
      file. SPEC_OPTS is used to force RSpec to output as JSON, so overriding \`--format\`  will
      cause an error.`,
      default: 'rspec %f'
    }
  }
}
