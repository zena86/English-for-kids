import { Store } from 'redux';

let storeInit: Store = null;
export function store(): Store {
  return storeInit;
}

export function init(newstore: Store): void {
  storeInit = newstore;
}
