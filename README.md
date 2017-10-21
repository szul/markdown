# Metron Markdown
A JavaScript powered markdown engine (written in TypeScript) for converting markdown to HTML.

Originally adapted from [Mathieu 'p01' Henri](https://github.com/p01/mmd.js), this markdown engine was used inside of the [metron](https://github.com/metronical/metron) library, but is now being abstracted and modified for general purpose use.

## Installation

    npm install metronical.markdown --save

This will install the module as a Node.js dependency, and the postinstall script should transpile it with TypeScript. The TypeScript compiler targets ES5, so that the module can be used on the web, and the module target is UMD.
