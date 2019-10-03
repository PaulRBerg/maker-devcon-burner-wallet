import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Portal, Box, Icon } from 'rimble-ui';
import styled from 'styled-components';

import {
  TransactionCard,
  TransactionCardHeader,
  TransactionCardBody
} from '../components/TransactionCard';

import Text from '../components/Text';
import IconButton from '../components/IconButton';

import Send from './Send';
import Receive from './Receive';

const ModalBackdrop = styled(Box)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 100vh;
  height: -webkit-fill-available;
  width: 100vw;
  padding: var(--page-margin);
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-flow: column;
  place-items: center;
  place-content: center;
`;

const ModalCard: React.FC<{
  title: string | React.ReactNode;
  children: React.ReactNode;
  backTo?: { pathname: string; state: object } | string;
  tabs?: React.ReactNode;
}> = ({ title, children, backTo, tabs }) => (
  <TransactionCard>
    <TransactionCardHeader>
      {backTo && <IconButton icon='back' to={backTo} />}
      <Text level={1} as={'h1'} left margin='0'>
        {title}
      </Text>
      {tabs && tabs}
    </TransactionCardHeader>
    <TransactionCardBody>{children}</TransactionCardBody>
  </TransactionCard>
);

interface ModalProps {
  history: any;
  location: any;
  match: any;
}

class Modals extends Component<ModalProps> {
  constructor(props: ModalProps) {
    super(props);
  }

  render() {
    return (
      <Portal>
        <Switch>
          <Route exact path='**/send/:to?/:amount?/:token?' component={Send} />
          <Route path='**/receive' component={Receive} />
        </Switch>
      </Portal>
    );
  }
}

export { ModalCard, ModalBackdrop };
export default withRouter(Modals);