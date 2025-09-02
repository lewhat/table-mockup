export interface Row {
  name: string;
  device: string;
  path: string;
  status: string;
  id?: string;
}

export type Data = Row[];
