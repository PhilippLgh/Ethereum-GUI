import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import { StoreContext, withGlobalState } from '../../../Context'
import { Row } from '../../../widgets/Row'
import { Column } from '../../../widgets/Column'
import GlobalToggle from '../../status/GlobalToggle'

const Setting = withGlobalState(({ name, item, global }) => {
  return (
    <div>
      <input type="checkbox" id="scales" name="scales" checked={!item.exclude} onChange={(ev) => {
        const exclude = !ev.target.checked
        const items = global.state[name]
        const updated = items.map(el => ( (el.label !== undefined ? el.label === item.label : el.name === item.name) ? { ...el, exclude } : el))
        const change = {}
        change[name] = [...updated]
        global.setState(change)
      }} />
      <label htmlFor="scales">{item.label || item.name}</label>
    </div>
  )
})

class OptionGroup extends Component {
  handleOnChange() {

  }
  render() {
    const { options } = this.props
    const name = Date.now()
    return (
      <div>
        {
          options.map((option, idx) => (
            <label style={{ marginLeft: 5 }} key={option} >
              <input
                type="radio"
                name={name}
                value={option}
                checked={true}
                onChange={() => this.handleOnChange(option, idx)}
              />
              {option}
            </label>
          ))
        }

      </div>
    )
  }
}

class Settings extends Component {
  static contextType = StoreContext
  render() {
    const { global } = this.props
    const { state: globalState } = global
    const { navItems, statusBarItems } = globalState
    return (
      <Container>
        <h2> Settings </h2>

        {/* 
        <h4>Language</h4>
        <OptionGroup
          options={['English', 'Deutsch']}
        />
        */}

        <h4>Theme</h4>
        {
          global.state.theme
        }

        {/*
        TODO custom provider settings
        <h4>Dangerous</h4>
        <GlobalToggle label="Dangerous operations" name={"dangerous"} options={[true, false]}  />


        <h4>Mode</h4>

        <OptionGroup
          options={['Default', 'Minimal', 'Expert', 'Custom']}
        />
        */}

        <Row style={{
          justifyContent: 'normal',
          borderTop: '1px solid gray',
          marginTop: 10
        }}>
          <Column>
            <h4>Navigation</h4>
            {
              navItems.map((item, idx) => <Setting key={item.label || item.name} name="navItems" item={item}  />)
            }
          </Column>
          <Column>
            <h4>Statusbar</h4>
            {
              statusBarItems.map((item, idx) => <Setting key={item.label || item.name} name="statusBarItems" item={item}  />)
            }
          </Column>
          <Column />
          <Column />
        </Row>

      </Container>
    )
  }
}

export default withGlobalState(Settings)
