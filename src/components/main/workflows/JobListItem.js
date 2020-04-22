import React, { Component } from 'react'
import moment from 'moment'
import ListItem from '../../../widgets/ListItem'
import Button from '../../../widgets/Button'
import Spinner from '../../../widgets/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Column } from '../../../widgets/Column'
import { Row } from '../../../widgets/Row'

export default class JobListItem extends Component {
  render() {
    const { job } = this.props
    const {
      id, // job id
      workflowId, // 
      name,
      displayName,
      version,
      isInstalled,
      state,
      started_at,
      finished_at
    } = job
    const isRunning = !job.finished_at

    return (
      <ListItem 
      to={`/workflows/jobs/${id.replace('jobId:','')}`}
      style={{
        alignItems: 'center'
      }}>
        <div style={{
          width: 20,
          height: 20,
          padding: 5
        }}>
          {isRunning
            ? <Spinner />
            : <FontAwesomeIcon icon={faCheck} style={{ color: '#08a79c', width: '100%', height: '100%' }} />
          }
        </div>
        <Column>
          <Row style={{
            justifyContent: 'normal',
            margin: 10
          }}>
            <div style={{
              margin: 5,
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: 'bold' }}>{displayName}</span>
              <span style={{ marginTop: -5, marginLeft: 10 }}>v{version}</span>
            </div>
          </Row>
          <div style={{
            marginLeft: 15
          }}>
            {
              isRunning
                ? <span>started {moment(job.started_at).from()}</span>
                : <span>finished {moment(job.finished_at).from()}</span>
            }
          </div>
        </Column>
      </ListItem>
    )
  }
}
