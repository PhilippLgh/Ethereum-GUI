import React, { Component } from 'react'
import { Terminal as XTermTerminal, IBuffer, ITerminalAddon } from 'xterm'
import "xterm/css/xterm.css"
import { AttachAddon } from 'xterm-addon-attach'
// import { FitAddon } from 'xterm-addon-fit'

/**
 * wrapper around xterm
 * to ease configuration and setup
 */
class TerminalWrapper {

  constructor( _container ) {
    this._container = _container

    const xterm = new XTermTerminal({
      cols: 180,
      rows: 500
    })
    this.xterm = xterm

    xterm.setOption('fontSize', 12)
    xterm.setOption('letterSpacing', 2)
    xterm.setOption('lineHeight', 1)
    xterm.setOption('cursorBlink', true)
    xterm.setOption('fontFamily', 'Menlo, "DejaVu Sans Mono", "Lucida Console", monospace')
    xterm.setOption('theme', {
      background: '#333'
    })
    xterm.writeln(`***** Ethereum Grid: Emulated Terminal for "foo" *****`)

    // const fitAddon = new FitAddon();
    // xterm.loadAddon(fitAddon);

    xterm.open(_container);

    // TODO kills scroll
    // fitAddon.fit()

  }
  attach(socketUrl) {
    const protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
    const socket = new WebSocket(`${protocol}${socketUrl}`);
    let x = new AttachAddon(socket);
    this.xterm.loadAddon(x);
  }

}

export default class TerminalUI extends Component {
  componentDidMount() {
    const { terminalContainer } = this
    const term = new TerminalWrapper(terminalContainer)
    term.attach(this.props.socketUrl)
  }
  render() {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden'
        }}
        ref={ref => {
          this.terminalContainer = ref
        }}
      />
    )
  }
}
