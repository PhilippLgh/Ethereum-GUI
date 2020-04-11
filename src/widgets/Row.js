import React from 'react'

export function Row({ children, style = {} }) { 
  return <div style={{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    display: 'flex', 
    ...style 
  }}>{ children }</div>
}
