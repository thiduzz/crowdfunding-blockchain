const path = require('path')
const fs = require('fs')
const solc = require('solc')

const compile = (contractFile) => {
  const contractPath = path.resolve(
    __dirname + '/../',
    'contracts',
    contractFile,
  )

  const input = {
    language: 'Solidity',
    sources: {
      [contractFile]: {
        content: fs.readFileSync(contractPath, 'utf-8'),
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  }

  const output = JSON.parse(solc.compile(JSON.stringify(input)))

  if (output.errors) throw new Error(format(output.errors))

  return output.contracts[contractFile]
}

const format = (error) => {
  const message = Object.keys(error[0]).map((key) => {
    return `\n ${key}: ${JSON.stringify(error[0][key])}`
  })
  return `Solidity compile error \n ${message}`
}

module.exports = compile
