'use babel'

export default class {
  constructor (example) {
    this.example = example
  }

  getElement () {
    const element = document.createElement('span')
    element.className = this.getClassName()

    if (this.example.status === 'failed') {
      this.addFailureTooltip(element)
    }

    return element
  }

  getClassName () {
    return `spec-gutter spec-gutter-highlight status-${this.example.status}`
  }

  addFailureTooltip (element) {
    atom.tooltips.add(element, {
      title: this.normalizeFailureMessage()
    })
  }

  normalizeFailureMessage () {
    var message = this.example.exception.message

    if (message[0] === '\n') {
      message = message.slice(1, -1)
    }

    return message.replaceAll('\n', '<br />')
  }
}
