import {createStore} from 'redux'
import reducers from '../reducer/reducers';

export const Store = createStore(reducers);