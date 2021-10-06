import axios from 'axios';

import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDevice, defaultValue } from 'app/shared/model/devices/device.model';

export const ACTION_TYPES = {
  FETCH_DEVICE_LIST: 'device/FETCH_DEVICE_LIST',
  FETCH_DEVICE: 'device/FETCH_DEVICE',
  LOCK_DEVICE: 'device/LOCK_DEVICE',
  REBOOT_DEVICE: 'device/REBOOT_DEVICE',
  DELETE_DEVICE: 'device/DELETE_DEVICE',
  RESET: 'device/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDevice>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type DeviceState = Readonly<typeof initialState>;

// Reducer

export default (state: DeviceState = initialState, action): DeviceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DEVICE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEVICE):
    case REQUEST(ACTION_TYPES.LOCK_DEVICE):
    case REQUEST(ACTION_TYPES.REBOOT_DEVICE):
    case REQUEST(ACTION_TYPES.DELETE_DEVICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };

    case FAILURE(ACTION_TYPES.FETCH_DEVICE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEVICE):
    case FAILURE(ACTION_TYPES.LOCK_DEVICE):
    case FAILURE(ACTION_TYPES.REBOOT_DEVICE):
    case FAILURE(ACTION_TYPES.DELETE_DEVICE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };

    case SUCCESS(ACTION_TYPES.FETCH_DEVICE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEVICE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.LOCK_DEVICE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.REBOOT_DEVICE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DEVICE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };

    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/emm/devices';

export const getEntities: ICrudGetAllAction<IDevice> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DEVICE_LIST,
  payload: axios.get<IDevice>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IDevice> = name => {
  const requestUrl = `${apiUrl}/${name}`;
  return {
    type: ACTION_TYPES.FETCH_DEVICE,
    payload: axios.get<IDevice>(requestUrl),
  };
};

export const lockDevice: ICrudGetAction<IDevice> = name => {
  const requestUrl = `${apiUrl}/${name}/lock`;
  return {
    type: ACTION_TYPES.LOCK_DEVICE,
    payload: axios.post<IDevice>(requestUrl),
  };
};

export const rebootDevice: ICrudGetAction<IDevice> = name => {
  const requestUrl = `${apiUrl}/${name}/reboot`;
  return {
    type: ACTION_TYPES.REBOOT_DEVICE,
    payload: axios.post<IDevice>(requestUrl),
  };
};

export const deleteDevice: ICrudGetAction<IDevice> = name => {
  const requestUrl = `${apiUrl}/${name}/delete`;
  return {
    type: ACTION_TYPES.DELETE_DEVICE,
    payload: axios.post<IDevice>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
