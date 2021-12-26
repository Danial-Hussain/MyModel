export interface ModelSelectorProps {
  setSelectedModelType: React.Dispatch<React.SetStateAction<string>>;
}

export interface ModelItem {
  id: string;
  name: string;
  selected: boolean;
  type: "Classifier" | "Regressor";
}
