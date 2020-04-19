import React from 'react';

import {
  Switch,
  Route,
} from "react-router-dom"

import BlockList from './components/main/blocks/BlockList';
import TransactionList from './components/main/transactions/TransactionList';
import AccountsList from './components/main/accounts/AccountsList';
import Contracts from './components/main/contracts/Contracts';
import CreateContractView from './components/main/contracts/CreateContractView';
import AccountDetails from './components/main/accounts/AccountDetails';
import ContractDetails from './components/main/contracts/ContractDetails';
import SendTransaction from './components/main/transactions/SendTransaction';
import BlockDetails from './components/main/blocks/BlockDetails';
import TransactionDetails from './components/main/transactions/TransactionDetails';
import ScriptList from './components/main/scripts/ScriptList';
import Settings from './components/main/settings/Settings';
import AddressList from './components/main/addresses/AddressList';
import Tools from './components/main/tools/Tools';
import Network from './components/main/network/Network';
import Client from './components/main/client/Client';
import Workflows from './components/main/workflows/Workflows';
import WorkflowDetails from './components/main/workflows/WorkflowDetails';
import JobDetails from './components/main/workflows/JobDetails';
import AppliedRoute from './AppliedRoute';

export default ({ provider, currentBlock }) =>
  <Switch>
    <AppliedRoute path="/accounts/:address" component={AccountDetails} props={{ provider }}  />
    <AppliedRoute path="/accounts" component={AccountsList} />
    <AppliedRoute path="/addresses" component={AddressList} />
    <AppliedRoute path="/blocks/:blockNumber" component={BlockDetails} props={{ provider }} />
    <AppliedRoute path="/blocks" component={BlockList} props={{ start: 0, end: currentBlock }} />
    <AppliedRoute path="/transactions/new/:from" component={SendTransaction} props={{ provider }} />
    <AppliedRoute path="/transactions/:txHash" component={TransactionDetails} props={{ provider }} />
    <AppliedRoute path="/transactions" component={TransactionList} props={{ blockNumber: currentBlock }} />
    <AppliedRoute path="/contracts/new" component={CreateContractView} props={{ provider }} />
    <AppliedRoute path="/contracts/:address" component={ContractDetails} props={{ provider }} />
    <AppliedRoute path="/contracts" component={Contracts} />
    <AppliedRoute path="/network" component={Network} props={{ provider }} />
    <AppliedRoute path="/client" component={Client} props={{ provider }} />
    <AppliedRoute path="/workflows/jobs/:jobId" component={JobDetails} props={{ provider }} />
    <AppliedRoute path="/workflows/:workflowId" component={WorkflowDetails} props={{ provider }} />
    <AppliedRoute path="/workflows" component={Workflows} props={{ provider }} />
    <AppliedRoute path="/scripts" component={ScriptList} props={{ provider }} />
    <AppliedRoute path="/tools" component={Tools} props={{ provider }} />
    <AppliedRoute path="/settings" component={Settings} props={{ provider }} />
  </Switch>
