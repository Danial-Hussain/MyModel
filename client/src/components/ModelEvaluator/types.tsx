export type ModelName = string;
export type ModelFolderName = string;
export type SelectDataPoint = { value: string; label: string };
export type SelectData = Array<SelectDataPoint>;
export type Variable = string;
export type Variables = Array<Variable>;
export type Data = string;
export type Metric = { name: string; value: number };
export type Metrics = Array<Metric>;

export interface ModelEvaluatorProps {
  currentModel: string;
}
