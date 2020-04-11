import React, { Component, Fragment } from 'react'
import Container from '../../../widgets/Container'
import { withRouter } from 'react-router-dom'
import ContractState from './ContractState'
import Address from '../../../widgets/Address'
import { Column } from '../../../widgets/Column'
import Console from '../../console/Console'
import ContractCode from './ContractCode'

class ContractDetails extends Component {
  state = {}
  componentDidMount = async () => {

  }
  handleSolcArtifact = (data) => {
    console.log('data', data)
    const { abi, source, bytecode } = data
    this.setState({
      source,
      abi: JSON.stringify(abi, null, 2),
      bytecode
    })
  }
  render() {
    const { match, provider } = this.props
    const { params } = match
    const { address } = params

    const context = {
      contract1: {
        setData(data){
          console.log('set data')
        },
        setDate(date) {
          console.log('set date')
        },
        getData(){
          console.log('get data')
        }
      }
    }

    return (
      <Container 
        style={{
          padding: 0,
          borderRadius: 0
        }}
        header={() => (<Fragment>Contract at <Address address={address} /></Fragment>)}
      >
        <Column>
          <ContractCode provider={provider} address={address} onData={this.handleSolcArtifact} />
          <div>
            <ContractState provider={provider} address={address} />
            <Console context={context}/>
          </div>
        </Column>
      </Container>
    )
  }
}

export default withRouter(ContractDetails)
