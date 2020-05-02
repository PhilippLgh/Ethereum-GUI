// https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options
const flags_geth = {
  '--main': {
    label: 'Main (real value)',
    flag: '',
  },
  '--testnet': {
    label: 'Ropsten (testnet)',
    toml: '',
    description: 'Ropsten network: pre-configured proof-of-work test network',
    support: [], // which version support flag
    group: 'network'
  },
  '--rinkeby': {
    label: 'Rinkeby (testnet)',
    description: 'Rinkeby network: pre-configured proof-of-authority test network',
    alias: '--networkid 4',
  },
  '--goerli': {
    label: 'Görli (testnet)',
    description: 'Görli network: pre-configured proof-of-authority test network'
  },
  '--dev': {
    label: 'Local (dev mode)',
    description: 'Ephemeral proof-of-authority network with a pre-funded developer account, mining enabled'
  },
  '--networkid $d': {
    description:  'Network identifier (integer, 1=Frontier, 2=Morden (disused), 3=Ropsten, 4=Rinkeby) (default: 1)'
  },
  '--rpc': {
    label: 'HTTP RPC API'
  },
  '--rpccorsdomain': {
    label: 'RPC Cors',
    requires: '--rpc'
  },
  '--rpcapi': {
    label: 'RPC APIs',
    requires: '--rpc'
  },
  '--allow-insecure-unlock': {
    label: 'Insecure Account Unlock',
    description: 'Allow insecure account unlocking when account-related RPCs are exposed by http'
  },
  '--graphql': {
    label: 'Enable GraphQL Server'
  },
}

// https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/
const flags_besu = {
  '--graphql-http-enabled': {
    env: 'BESU_GRAPHQL_HTTP_ENABLED',
    type: 'boolean',
    toml: 'graphql-http-enabled',
    description: 'Enables the GraphQL HTTP service. The default is false.\nThe default GraphQL HTTP service endpoint is http://127.0.0.1:8547/graphql if set to true'
  },
  '--graphql-http-cors-origins': {
    description: 'A list of comma-separated origin domain URLs for CORS validation. The default is none.'
  }
}

const SETTINGS_GROUPS = {
  'Network': ['--main', '--testnet', '--rinkeby', '--goerli', '--dev', '--networkid $d']
}


const convert = () => {
  const settings = SETTINGS_GROUPS
  for (const settingKey in settings) {
    const settingValue = settings[settingKey]
    
  }
}


const extendFlagsTableWithGroups = (flagTable, groups) => {
  for (const groupName in groups) {
    const group = groups[groupName];
    for (const flag of group) {
      flagTable[flag].group = groupName
    }
  }
  return flagTable
}

export const flagsToSettings = (flags) => {
  const flagsTable = extendFlagsTableWithGroups(flags_geth, SETTINGS_GROUPS)

  const parts = flags.split('--').map(flag => '--'+flag) 

  const settings = []
  for (const currentFlag of parts) {

    const [flagKey, flagValue] = currentFlag.replace(/"/g, '').split(/=| /)

    if (flagsTable[flagKey]) {
      const flagMetadata = flagsTable[flagKey]
      // e.g. --goerli, --testnet are part of group 'network'
      if (flagMetadata.group) {
        // generate other options for group. 
        // this will be rendered as a select field with mutually exclusive options
        const options = SETTINGS_GROUPS[flagMetadata.group]
        settings.push({
          label: flagMetadata.group,
          default: flagKey,
          options: options.map(option => ({
            label: flagsTable[option].label,
            value: option,
          }))
        })
      } 
      
      else {

        // e.g. --rpccorsdomain="*" => key:--rpccorsdomain, value:'*'
        if (flagValue) {
          const values = flagValue.split(',')
          let options = undefined
          let isMulti = false
          if (values.length > 1) {
            options = values.map(o => ({ label: o, value: o}))
            isMulti =true
          }
          settings.push({
            label: flagMetadata.label || 'no label',
            default: flagValue,
            options,
            isMulti
          })
        } else {
          settings.push({
            label: flagMetadata.label || 'no label',
            default: 'true',
            options: [ {label: 'on', value: 'true' }, { label: 'off', value: 'false' } ]
          })
        }
      }
    } else {
      console.warn('no metadata found for flag', currentFlag)
    }
  }
  return settings
}

const settingsToFlags = () => {}

export const clients = [
  { 
    name: 'Ganache', 
    logo: 'https://raw.githubusercontent.com/trufflesuite/ganache/develop/static/icons/png/128x128.png',
  },
  { 
    name: 'Geth', 
    logo: 'https://geth.ethereum.org/static/images/mascot.png',
    profiles: [
      {
        name: 'dev',
        flags: './geth --dev --rpc --rpccorsdomain="*" --rpcapi "eth,web3,personal,net,debug,admin" --allow-insecure-unlock --graphql'
      },
      {
        name: 'main',
        flags: ' ',
      },
      { name: 'custom' }
    ] 
  },
  { 
    name: 'Besu', 
    logo: 'https://www.hyperledger.org/wp-content/uploads/2019/08/Hyperledger_Besu_color.png', 
    deactivated: true 
  },
  { 
    name: 'Nethermind', 
    logo: 'https://c.gitcoin.co/grants/c5141dbcabe3cca0d61c76d9e7e3b6a7/Nethermind_logo_RGB.png', 
    deactivated: true 
  },
  { name: 'Open Ethereum', logo: 'https://www.parity.io/assets/img/logos/logo-parity-dark.png?v=668139a6b7', deactivated: true }
]
