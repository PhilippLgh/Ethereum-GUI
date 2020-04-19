import React from 'react'
import { useTheme } from '../Theme'
import { withGlobalState } from '../Context'
import Text from './Text'

export const LabeledField = withGlobalState(({ children, label, value, valueEl, style = {}, alignValue = 'left', global, styleValue = {} }) => {
  const theme = useTheme(global)
  return (
    <div style={{
      padding: 5,
      display: 'flex',
      flexDirection: 'column',
      ...style
    }}>
      <div style={{ 
        fontSize: '0.8rem', 
        color: theme.field.label.color,
        alignSelf: alignValue,
      }}>
        <Text>{label}</Text>
      </div>
      <div style={{
        color: theme.field.value.color,
        alignSelf: alignValue,
        ...styleValue
      }}>
        {
          typeof valueEl === 'function'
          ? valueEl()
          : (value !== undefined ? value.toString() : (children || undefined))
        }
      </div>
    </div>
  )
})