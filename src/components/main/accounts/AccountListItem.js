import React, { Component } from 'react'
import { LabeledField } from '../../../widgets/LabeledField'
import ListItem from '../../../widgets/ListItem'
import Address from '../../../widgets/Address'
import EthValue from '../../../widgets/EthValue'
import NavButton from '../../../widgets/NavButton'

export default class AccountListItem extends Component {
  state = {
    balance: '',
    txCount: -1
  }
  componentDidMount = async () => {
    const { provider, address } = this.props
    const balance = await provider.getBalance(address)
    const txCount = await provider.getTransactionCount(address)
    this.setState({ balance, txCount })
  }
  render() {
    const { address} = this.props
    const { balance, txCount } = this.state
    return (
      <ListItem className="AccountListItem" to={`/accounts/${address}`} style={{
        justifyContent: 'space-between'
      }}>
        <LabeledField label="Address" valueEl={() => <Address address={address} /> } style={{
          flexBasis: '30em'
        }}/>
        <LabeledField label="Balance" style={{
          flexBasis: '15em',
        }}>
          <EthValue wei={balance} />
        </LabeledField>
        <LabeledField 
          label="Tx Count" 
          value={ txCount || 0} 
          style={{
            alignSelf: 'right'
          }} 
          styleValue={{
            paddingTop: 5
          }}
        />
        <NavButton to={`/transactions/new/${address}`} label={"send"} />
      </ListItem>
    )
  }
}

