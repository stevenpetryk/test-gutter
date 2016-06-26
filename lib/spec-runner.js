'use babel'

import childProcess from 'child_process'
import concat from 'concat-stream'

export default class {
  constructor (projectPath) {
    this.projectPath = projectPath
  }

  runSpec (spec, callback) {
    var terminal = childProcess.spawn('bash')
    terminal.stdout.pipe(concat((output) => this.handleOutput(output, callback)))
    terminal.stdin.write(`cd ${this.projectPath} && rspec --format json ${spec}\n`)
    terminal.stdin.end()
  }

  handleOutput (output, callback) {
    var result = JSON.parse(output.toString())
    callback(result.examples)
  }
}
