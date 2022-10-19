import { ConnectionString, DBHelper } from '@ldb/db-common';
import { ENV, InstanceName, InstanceType, L, States } from './types';

export interface SystemConfig {
  env : ENV;
  l   : L;
  i  ?: number;
  t   : InstanceType;
};

type InstanceConfig = Partial<Record<InstanceName, SystemConfig>>;
type InstanceConnection = Partial<Record<InstanceName, ConnectionString>>;

export const InstanceConfigs: InstanceConfig = {
  L1Local   : { env: 'local', l: 1, i: 0, t: States.ACTIVE & States.ARCHIVE },
  L1Local1  : { env: 'local', l: 1, i: 1, t: States.ACTIVE & States.ARCHIVE },
  L1Local2  : { env: 'local', l: 1, i: 2, t: States.ACTIVE & States.ARCHIVE },
  L1Local3  : { env: 'local', l: 1, i: 3, t: States.ACTIVE & States.ARCHIVE },
  L2Local   : { env: 'local', l: 2, i: 0, t: States.ACTIVE & States.ARCHIVE },
  L2Local1  : { env: 'local', l: 2, i: 1, t: States.ACTIVE & States.ARCHIVE },

  L1_SIT    : { env: 'sit'  , l: 1, i: 0, t: States.ACTIVE & States.ARCHIVE },
  L2_SIT    : { env: 'sit'  , l: 2, i: 0, t: States.ACTIVE & States.ARCHIVE },

  L1_UAT    : { env: 'uat'  , l: 1, i: 0, t: States.ACTIVE & States.ARCHIVE },
  L2_UAT    : { env: 'uat'  , l: 2, i: 0, t: States.ACTIVE & States.ARCHIVE },

  L1_PRO    : { env: 'prod' , l: 1, i: 0, t: States.ACTIVE },
  L2_PRO    : { env: 'prod' , l: 2, i: 0, t: States.ACTIVE },

  L1_PROARC : { env: 'prod' , l: 1, i: 0, t: States.ARCHIVE },
  L2_PROARC : { env: 'prod' , l: 2, i: 0, t: States.ARCHIVE },
};


export const InstanceConnections: InstanceConnection = {
  L1Local   : DBHelper.getConnectionString('mongodb://10.10.50.12:39100,10.10.50.13:39100,10.10.50.14:39100/?replicaSet=L1Local'),
  L1Local1  : DBHelper.getConnectionString('mongodb://10.10.50.12:39101,10.10.50.13:39101,10.10.50.14:39101/?replicaSet=L1pLocal'),
  L1Local2  : DBHelper.getConnectionString('mongodb://10.10.50.12:39102,10.10.50.13:39102,10.10.50.14:39102/?replicaSet=L1ppLocal'),
  L1Local3  : DBHelper.getConnectionString('mongodb://10.10.50.12:39103,10.10.50.13:39103,10.10.50.14:39103/?replicaSet=L1pppLocal'),
  L2Local   : DBHelper.getConnectionString('mongodb://10.10.50.12:39100,10.10.50.13:39100,10.10.50.14:39100/?replicaSet=L2Local'),
  L2Local1  : DBHelper.getConnectionString('mongodb://10.10.50.12:39101,10.10.50.13:39101,10.10.50.14:39101/?replicaSet=L2pLocal'),

  L1_SIT    : DBHelper.getConnectionString('mongodb://10.99.99.187:27301/?replicaSet=SabaSIT'),
  L2_SIT    : DBHelper.getConnectionString('mongodb://10.99.99.187:37301/?replicaSet=SabaL2SIT'),

  L1_UAT    : DBHelper.getConnectionString('mongodb://10.99.99.187:27201/?replicaSet=SabaUAT'),
  L2_UAT    : DBHelper.getConnectionString('mongodb://10.99.99.187:37201/?replicaSet=SabaL2UAT'),

  L1_PRO    : DBHelper.getConnectionString('mongodb://10.99.99.54:27101,10.99.99.53:27102,10.99.99.187:27103/?replicaSet=SabaMain'),
  L2_PRO    : DBHelper.getConnectionString('mongodb://10.99.99.53:37101,10.99.99.54:37102,10.99.99.187:37103/?replicaSet=L2_SabaMain'),

  L1_PROARC : DBHelper.getConnectionString('mongodb://10.99.99.187:27151,10.99.99.53:27151,10.99.99.54:27151/?replicaSet=L1_SabaArc'),
  L2_PROARC : DBHelper.getConnectionString('mongodb://10.99.99.187:37151,10.99.99.53:37151,10.99.99.54:37151/?replicaSet=L2_SabaArc'),
};

/**
 * @param env 
 * @param t 
 * @param l 
 * @param i 
 * @returns 
 */
export function getInstanceConfigs(env?: ENV, t?: InstanceType, l?: L, i?: number): InstanceConfig {
  return Object.fromEntries(Object.entries(InstanceConfigs).filter((config) => {
    const filterEnv = (env != null) ? (config[1].env === env ) : true;
    const filterI   = (i   != null) ? (config[1].i   === i   ) : true;
    const filterL   = (l   != null) ? (config[1].l   === l   ) : true;
    const filterT   = (t   != null) ? Boolean(config[1].t & t) : true;
    return filterEnv && filterI && filterL && filterT;
  }));
};

/**
 * @param env 
 * @param t 
 * @param l 
 * @param i 
 * @returns 
 */
export function getInstanceConnections(env?: ENV, t?: InstanceType, l?: L, i?: number): InstanceConnection {
  const configs = getInstanceConfigs(env, t, l, i);
  return Object.fromEntries(Object.entries(InstanceConnections).filter((conn) => {
    return Object.keys(configs).includes(conn[0]);
  }));
};

export const Instances = Object.freeze({ getInstanceConfigs, getInstanceConnections });
export default Instances;
