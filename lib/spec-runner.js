'use babel'

import childProcess from 'child_process'
import concat from 'concat-stream'

export default class {
  runSpec (editor, gutter, spec) {
    if (!this.markers) {
      this.markers = []
    }

    var terminal = childProcess.spawn('bash')
    terminal.stdout.pipe(concat((output) => this.outputHandler(editor, gutter, output)))
    terminal.stdin.write(`cd ${this.getProjectPath()} && rspec --format json ${spec}\n`)
    terminal.stdin.end()
  }

  outputHandler (editor, gutter, output) {
    try {
      var result = JSON.parse(output.toString())

      this.markers.forEach((marker) => {
        marker.destroy()
      })

      this.markers = []

      result.examples.forEach((example) => {
        var range = editor.getBuffer().rangeForRow(example.line_number - 1)
        var marker = editor.markBufferRange(range)

        this.markers.push(marker)

        gutter.decorateMarker(marker, {
          class: 'spec-gutter-row',
          item: getElement(example.status)
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  getProjectPath () {
    return atom.project.getPaths()[0]
  }
}

function getElement (exampleStatus) {
  const element = document.createElement('span')
  element.className = `spec-gutter spec-gutter-highlight status-${exampleStatus}`
  return element
}
