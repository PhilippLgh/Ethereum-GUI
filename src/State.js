// TODO init from storage

export const globalState = {
  theme: 'light',
  alias: false,
  time: 'block',
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
    { label: 'Tools', route: '/tools', exclude: true },
    { label: 'Scripts', route: '/scripts', exclude: true },
    { label: 'Settings', route: '/settings', exclude: false },
  ],
  statusBarItems: [
    { name: 'sync', exclude: false },
    { name: 'current_block', exclude: false },
    { name: 'state_time', exclude: false },
    { name: 'gas_price', exclude: false },
    { name: 'hardfork', exclude: false },
    { name: 'network', exclude: false },
    { name: 'rpc_server', exclude: false },
    { name: 'currency', exclude: false },
    { name: 'time', exclude: false },
    { name: 'alias', exclude: false },
    { name: 'signer', exclude: false },
    { name: 'theme', exclude: false }
  ],
  aliases: {
  }
 }
