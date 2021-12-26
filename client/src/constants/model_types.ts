import { ModelItem } from "../components/ModelSelector/types";

export const model_types: ModelItem[] = [
  {
    id: "1",
    name: "Ordinary Least Squares Regression",
    selected: true,
    type: "Regressor",
  },
  {
    id: "2",
    name: "Robust Linear Regression",
    selected: false,
    type: "Regressor",
  },
  {
    id: "3",
    name: "Logistic Regression",
    selected: false,
    type: "Classifier",
  },
  {
    id: "5",
    name: "Ridge Regression",
    selected: false,
    type: "Regressor",
  },
  {
    id: "6",
    name: "Lasso Regression",
    selected: false,
    type: "Regressor",
  },
  {
    id: "7",
    name: "Elastic Net Regression",
    selected: false,
    type: "Regressor",
  },
  {
    id: "8",
    name: "Decision Tree Regression",
    selected: false,
    type: "Regressor",
  },
  {
    id: "9",
    name: "Random Forrest Regressor",
    selected: false,
    type: "Regressor",
  },
  {
    id: "10",
    name: "Ridge Classifier",
    selected: false,
    type: "Classifier",
  },
  {
    id: "11",
    name: "Decision Tree Classifier",
    selected: false,
    type: "Classifier",
  },
  {
    id: "12",
    name: "Random Forrest Classifier",
    selected: false,
    type: "Classifier",
  },
];
