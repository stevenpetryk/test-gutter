'use babel'

import EditorManager from './editor-manager'

export default {
  subscription: null,
  testRunners: [],

  activate () {
    this.subscription = atom.workspace.observeTextEditors((editor) => {
      var manager = new EditorManager(
        () => this._getTestRunnerForEditor(editor),
        editor
      )
      manager.run()
      manager.bindListeners()
    })
  },

  deactivate () {
    this.subscription.dispose()
  },

  consumeTestRunner (testRunner) {
    this.testRunners.push(testRunner)
  },

  _getTestRunnerForEditor (editor) {
    return this.testRunners.find((testRunner) => (
      testRunner.grammars.indexOf(editor.getGrammar().scopeName) > -1
    ))
  }
}
