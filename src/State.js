// TODO init from storage

export const globalState = {
  theme: 'light',
  alias: false,
  time: 'block',
  badge: '',
  dangerous: false,
  isConnected: false,
  selectedProvider: 'Ganache', // user setting
  connectionInterval: 2000, // test for connection every x ms
  providers: [
    { name: 'Geth', url: '127.0.0.1:8545' }
   ,{ name: 'Ganache', url: '127.0.0.1:7545' }
   ,{ name: 'Metamask', url: 'web3' }
   // ,{ name: 'Infura', url: '' }
  ],
  provider: undefined, // provider instance
  navItems: [
    { label: 'Accounts', route: '/accounts', exclude: false },
    { label: 'Addresses', route: '/addresses', exclude: false },
    { label: 'Blocks', route: '/blocks', exclude: false },
    { label: 'Transactions', route: '/transactions', exclude: false },
    { label: 'Contracts', route: '/contracts', exclude: false },
    /*
    'Events',
    'Logs',
    */
    { label: 'Network', route: '/network', exclude: false },
    { label: 'Client', route: '/client', exclude: false },
    { label: 'Workflows', route: '/workflows', exclude: false },
    { label: 'Tools', route: '/tools', exclude: true },
    { label: 'Scripts', route: '/scripts', exclude: true },
    { label: 'Settings', route: '/settings', exclude: false },
  ],
  statusBarItems: [
    { name: 'provider', exclude: false },
    { name: 'network', exclude: false },
    { name: 'current_block', exclude: false },
    { name: 'sync', exclude: false },

    { name: 'state_time', exclude: false },
    { name: 'gas_price', exclude: false },


    /*
    { name: 'hardfork', exclude: false },
    */

    { name: 'currency', exclude: false },
    { name: 'time', exclude: false },
    { name: 'alias', exclude: false },
    { name: 'signer', exclude: false },
    { name: 'theme', exclude: false }
  ],
  aliases: {
  }
 }
