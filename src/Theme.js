const dark = {
  primaryBackground: '#292929'
}

// TODO consider simplification to foreground & background
export const Themes = {
  light: {
    foreground: '#636363',
    backgroundColor: '#FBFAFC',
    topNav: {
      backgroundColor: '#fff',
      item: {
        color: 'rgb(38, 68, 82)'
      }
    },
    statusBar: {
      backgroundColor: '#fff',
      label: {
        color: '#5e5e5e'
      },
      value: {
        color: '#3e3e3e'
      }
    },
    field: {
      label: {
        color: '#636363' 
      },
      value: {
        color: '#3e3e3e'
      }
    },
    container: {
      backgroundColor: 'white'
    }
  },
  dark: {
    foreground: 'white',
    backgroundColor: '#262626',
    topNav: {
      backgroundColor: dark.primaryBackground,
      item: {
        color: 'white'
      }
    },
    statusBar: {
      backgroundColor: dark.primaryBackground,
      label: {
        color: '#9e9e9e'
      },
      value: {
        color: '#cecece'
      }
    },
    field: {
      label: {
        color: 'white' 
      },
      value: {
        color: 'white'
      } 
    },
    container: {
      backgroundColor: dark.primaryBackground,
      color: 'white',
    }
  },
};

export const useTheme = (global) => {
  const { state: globalState } = global
  const theme = Themes[globalState.theme]
  return theme
}