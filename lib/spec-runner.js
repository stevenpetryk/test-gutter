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
    terminal.stdin.write(this.getCommand(spec))
    terminal.stdin.end()
  }

  getCommand (spec) {
    var command = atom.config.get('atom-spec-gutter.command')
    command = command.replaceAll('%f', spec)

    return `cd ${this.projectPath} && SPEC_OPTS="-f json" ${command}\n`
  }

  handleOutput (output, callback) {
    var result = JSON.parse(output.toString())
    console.log('[RSpec] Examples:', result.examples)
    callback(result.examples)
  }
}
