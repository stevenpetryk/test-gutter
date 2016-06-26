'use babel'

import AtomSpexyView from './atom-spexy-view'
import { CompositeDisposable } from 'atom'

export default {
  atomSpexyView: null,
  modalPanel: null,
  subscriptions: null,

  activate (state) {
    this.atomSpexyView = new AtomSpexyView(state.atomSpexyViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomSpexyView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-spexy:toggle': () => this.toggle()
    }))
  },

  deactivate () {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.atomSpexyView.destroy()
  },

  serialize () {
    return {
      atomSpexyViewState: this.atomSpexyView.serialize()
    }
  },

  toggle () {
    console.log('AtomSpexy was toggled!')

    var editor = atom.workspace.getActiveTextEditor()
    var range = editor.getSelectedBufferRange()
    var marker = editor.markBufferRange(range)
    decoration = editor.decorateMarker(marker, {type: 'line', class: 'my-line-class'})


    setTimeout(() => {
      this.modalPanel.hide()
    }, 1000)

    return (
      this.modalPanel.isVisible() ? this.modalPanel.hide() : this.modalPanel.show()
    )
  }
}
