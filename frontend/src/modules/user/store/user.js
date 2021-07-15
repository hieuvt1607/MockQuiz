import state from './user.state';
import mutations from './user.mutation';
import actions from './user.action';
import getters from './user.getter';

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
