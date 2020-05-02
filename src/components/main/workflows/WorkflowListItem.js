import React, { Component } from 'react'
import { Row } from '../../../widgets/Row'
import Button from '../../../widgets/Button'
import DateField from '../../../widgets/DateField'
import Address from '../../../widgets/Address'
import { Column } from '../../../widgets/Column'
import ListItem from '../../../widgets/ListItem'
import Pill from '../../../widgets/Pill'

export default class WorkflowListItem extends Component {
  render() {
    const { workflow } = this.props
    const {
      projectId,
      version,
      workflowId,
      // created_at,
      updated_at,
      displayName,
      shortDescription,
      publisher, 
    } = workflow

    // hosted workflow
    let {
      releaseId = ''
    } = workflow
    // url-friendly
    releaseId = releaseId.split('@')[0].replace('/', '-')

    const { name: publisherName, address } = publisher || {}
    // TODO support tags
    const hasTags = false
    return (
      <ListItem to={`/workflows/${releaseId || workflowId}`}>
        <Column>
          <Row style={{ alignItems: 'center', padding: 5 }}>
            <Button
              icon="Play"
              iconColor="#08a79c"
              label=""
              onClick={() => this.props.onRunWorkflow(workflow)}
            />
            <Column style={{ marginLeft: 5}}>
              <Row style={{ marginBottom: 10 }}>
                <div style={{
                  margin: 5,
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: 'bold' }}>{displayName}</span>
                  <span style={{ marginTop: -5, marginLeft: 10 }}>v{version}</span>
                  <DateField ts={updated_at / 1000} relative style={{ marginLeft: 'auto' }} />
                </div>
                <div style={{ display: 'none', flexDirection: 'column' }}>
                  <div style={{ alignSelf: 'flex-end' }}>{publisherName}</div>
                  <Address address={address} />
                </div>
              </Row>
              <Row>
                <span style={{ marginLeft: 5, marginTop: -5 }}>{shortDescription}</span>
              </Row>
            </Column>
          </Row>
          {hasTags &&
            <Row style={{
              paddingLeft: 52
            }}>
              <Pill>Beginner</Pill>
            </Row>
          }
        </Column>

      </ListItem>
    )
  }
}
