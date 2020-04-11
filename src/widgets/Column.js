import React from 'react'

export function Column({ children, style }) { 
  return <div style={{ 
    flexDirection: 'column', 
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    ...style 
  }}>{ children }</div>
}
