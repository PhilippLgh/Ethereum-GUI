import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import Button from '../../../widgets/Button'
import { ethers } from 'ethers';
import { withRouter, NavLink } from 'react-router-dom';
import Form from '../../../widgets/Form';
import TextField from '../../../widgets/TextField';

class SendTransaction extends Component {
  state = {
    from: '',
    to: '',
    amount: '1',
    tx: undefined
  }
  componentDidMount = async () => {
    const { provider } = this.props
    if (!provider) return

    const to = this.getTo()
    const signer = await provider.getSigner();
    const from = await signer.getAddress()
    this.setState({
      from,
      to
    })
  }
  sendTransaction = async (to, amountString) => {
    const { provider, from } = this.props
    const signer = await provider.getSigner();
    const amount = ethers.utils.parseEther(amountString);
    const txRaw = {
        to,
        value: amount
    };
    const tx = await signer.sendTransaction(txRaw);
    this.setState({ tx })
    console.log('tx', tx)
  }
  getTo() { 
    const { match } = this.props
    const { params } = match
    const { to } = params
    return to
  }
  render() {
    const { from, to, amount, tx } = this.state
    return (
      <Container
        header={ "Send transaction"}
      >
        <Form style={{
          marginTop: 20,
          fontSize: '1.25rem'
        }}>
          <TextField label="From:" type="address" value={from} onChange={value => this.setState({ from: value })} />
          <TextField label="To:" type="address" value={to} onChange={value => this.setState({ to: value })} />
          <TextField label="Amount:" value={amount} suffix="ETH" onChange={value => this.setState({ amount: value })} />
          <TextField label="Fee" value="" disabled />
          <div>
            <Button 
              style={{
                marginLeft: 10,
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
                border: '2px solid #08a79c', 
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}
              label="Send"
              dangerous={true}
              onClick={() => this.sendTransaction(to, amount)} />
          </div>
        </Form>
        { tx && <div style={{ fontSize: '1.25rem', marginTop: 20 }}>Transaction sent: <NavLink to={`/transactions/${tx.hash}`}>{tx.hash}</NavLink>  </div>}
      </Container>
    )
  }
}

export default  withRouter(SendTransaction)
