export type OptionType = { value: string; label: string };
export type OptionsType = Array<OptionType>;

export interface SelectionProps {
  id: string;
  name: string;
  type: "single" | "multi";
  options: OptionsType;
  placeholder: string;
  isDisabled: boolean;
  value?: object | string;
  updateState?: (selectedOptions: any) => void;
}
