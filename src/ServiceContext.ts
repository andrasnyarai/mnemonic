import React from 'react';

import type { SendFn, ServiceState } from './memoryMachine';

export const ServiceContext = React.createContext<{
  state: ServiceState;
  send: SendFn;
}>({ state: null as unknown as ServiceState, send: null as unknown as SendFn });
