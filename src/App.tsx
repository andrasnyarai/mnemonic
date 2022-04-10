import { useMachine } from '@xstate/react';
import React from 'react';

import { Cards, Loading, Players, Start } from './components';
import { memoryMachine } from './memoryMachine';
import { ServiceContext } from './ServiceContext';

export const App = () => {
  const [state, send] = useMachine(memoryMachine);

  if (state.matches('loading')) {
    return <Loading />;
  }

  return (
    <ServiceContext.Provider value={{ state, send }}>
      {state.matches('idle') ? <Start /> : <Cards />}
      <Players />
    </ServiceContext.Provider>
  );
};
