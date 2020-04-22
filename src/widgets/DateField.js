import React from 'react'
import moment from 'moment'

export default function DateField({ ts, relative = false, style }) {
  return (
    <span style={{
      ...style
    }}>
      { relative
      ? moment.unix(ts).from()
      : moment.unix(ts).format("YYYY-MM-DD HH:mm:ss") 
      }
    </span>
  )
}
