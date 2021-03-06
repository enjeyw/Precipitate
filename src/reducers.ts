import { DEEEEEEP } from "../utils";
import {
  APILifecycleActionTypesInterface,
  byIdState,
  IdListState,
  NamedRegistration,
  RequestingState
} from "./types";
import {
  deepUpdateObjectsActionType,
  replaceIDListActionType,
  replaceUpdateObjectsActionType
} from "./actions";

export const lifecycleReducerFactory = (
  actionType: APILifecycleActionTypesInterface,
  reg: NamedRegistration
): ((state: RequestingState | undefined, action: any) => RequestingState) => {
  const initialLoaderState = {
    isRequesting: false,
    success: false,
    error: null
  };
  return (
    state: RequestingState | undefined = initialLoaderState,
    action: any
  ): RequestingState => {
    switch (action.type) {
      case actionType.request(reg.name):
        return { ...state, isRequesting: true };

      case actionType.success(reg.name):
        return { ...state, isRequesting: false, success: true };

      case actionType.failure(reg.name):
        return {
          ...state,
          isRequesting: false,
          success: false,
          error: action.error
        };

      default:
        return state;
    }
  };
};

export const byIdReducerFactory = (
  reg: NamedRegistration
): ((state: byIdState | undefined, action: any) => byIdState) => {
  return (state: byIdState | undefined = {}, action: any): byIdState => {
    switch (action.type) {
      case deepUpdateObjectsActionType(reg.name):
        return DEEEEEEP(state, action.objects);

      case replaceUpdateObjectsActionType(reg.name):
        return action.objects;

      default:
        return state;
    }
  };
};

export const IdListReducerFactory = (
  reg: NamedRegistration
): ((state: IdListState | undefined, action: any) => IdListState) => {
  return (state: IdListState | undefined = [], action: any): IdListState => {
    switch (action.type) {
      case replaceIDListActionType(reg.name):
        return (state = action.IdList);
      default:
        return state;
    }
  };
};
