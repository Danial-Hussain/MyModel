export type InputField = string | null;
export type FolderStatus =
  | "success1"
  | "success2"
  | "failed1"
  | "failed2"
  | "null";

export interface Model {
  name: string;
  type: string;
  created_date: string;
  predictors: Array<{ feature_name: string }>;
  response: { feature_name: string };
  metrics: Array<{ metric_name: string; metric_value: number }>;
  selected: boolean;
}

export interface Folder {
  id: number;
  name: string | null;
  models: Array<Model>;
  selected: boolean;
}
