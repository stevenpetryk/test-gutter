'use babel'

export default class {
  constructor (example) {
    this.example = example
  }

  getElement () {
    const element = document.createElement('span')
    element.className = this._getClassName()

    if (this.example.status === 'failed') {
      this._addFailureTooltip(element)
    }

    return element
  }

  _getClassName () {
    return `test-gutter test-gutter-highlight status-${this.example.status}`
  }

  _addFailureTooltip (element) {
    atom.tooltips.add(element, {
      title: this._normalizeFailureMessage()
    })
  }

  _normalizeFailureMessage () {
    var message = this.example.exception.message

    if (message[0] === '\n') {
      message = message.slice(1, -1)
    }

    return message.replaceAll('\n', '<br />')
  }
}
