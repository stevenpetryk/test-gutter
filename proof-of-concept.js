var childProcess = require('child_process')
var concat = require('concat-stream')

var terminal = childProcess.spawn('bash')

var concatStream = concat(output)

function output (buffer) {
  var specs = JSON.parse(buffer.toString())

  specs.examples.forEach((example) => {
    console.log(example.full_description)
    console.log(example.file_path + ':' + example.line_number)
    console.log(example.status)
    console.log('')
  })
}

terminal.stdout.pipe(concatStream)
terminal.stdin.write('cd /Users/spetryk/code/teeps/hoshi/hoshi-api && zeus rspec\n')
terminal.stdin.end()
