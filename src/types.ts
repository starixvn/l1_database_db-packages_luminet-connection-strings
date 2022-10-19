export const States = {
  ACTIVE  : 1,
  ARCHIVE : 2,
};

export enum InstanceType {
  ACTIVE  = States.ACTIVE,
  ARCHIVE = States.ARCHIVE,
  MIX     = States.ACTIVE | States.ARCHIVE,
};

export type ENV = 'local' | 'sit' | 'uat' | 'prod';

export type InstanceName =
'L1Local'   | 'L1Local1'  | 'L1Local2'  | 'L1Local3'  |
'L2Local'   | 'L2Local1'  |
'L1_SIT'    | 'L2_SIT'    |
'L1_UAT'    | 'L2_UAT'    |
'L1_PRO'    | 'L2_PRO'    |
'L1_PROARC' | 'L2_PROARC' ;

export type L = 1 | 2;
