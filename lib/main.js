'use babel'

import EditorManager from './editor-manager'

export default {
  subscription: null,

  activate () {
    this.subscription = atom.workspace.observeTextEditors((editor) => {
      var manager = new EditorManager(editor)
      manager.run()
      manager.bindListeners()
    })
  },

  deactivate () {
    this.subscription.dispose()
  },

  config: {
    command: {
      type: 'string',
      title: 'RSpec Command',
      default: 'rspec %f',
      description: 'The command to run to run your specs. `%f` will be interpolated with the ' +
      'file. SPEC_OPTS is used to force RSpec to output as JSON, so overriding `--format` will ' +
      'cause an error.'
    }
  }
}
