import { useMachine } from '@xstate/react';
import React, { useEffect } from 'react';

import { Cards, Players } from './components';
import { memoryMachine } from './memoryMachine';
import { ServiceContext } from './ServiceContext';

export const App = () => {
  const [state, send] = useMachine(memoryMachine);

  useEffect(() => {
    send('START', { playersCount: 4 });
  }, []);

  if (state.matches('loading')) {
    return <div>loading...</div>;
  }

  return (
    <ServiceContext.Provider value={{ state, send }}>
      <Cards />
      <Players />
    </ServiceContext.Provider>
  );
};
