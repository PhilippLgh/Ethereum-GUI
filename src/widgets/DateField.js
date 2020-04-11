import React from 'react'
import moment from 'moment'

export default function DateField({ ts }) {
  return (
    <span>
      { moment.unix(ts).format("YYYY-MM-DD HH:mm:ss") }
    </span>
  )
}
