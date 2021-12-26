import React from "react";
import { SelectElement, SelectContainer } from "./style";
import { SelectionProps } from "./types";

export const Selection = ({
  id,
  name,
  type,
  options,
  placeholder,
  isDisabled,
  value,
  updateState,
}: SelectionProps): React.ReactElement => {
  if (type === "single") {
    return (
      <SelectContainer>
        <SelectElement
          className="basic-single"
          classNamePrefix="Select"
          isSearchable
          id={id}
          name={name}
          options={options}
          placeholder={placeholder}
          isDisabled={isDisabled}
          value={value}
          onChange={updateState}
        />
      </SelectContainer>
    );
  }
  return (
    <SelectContainer>
      <SelectElement
        classNamePrefix="Select"
        id={id}
        isMulti
        isSearchable
        autoFocus
        name={name}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        value={value}
        onChange={updateState}
      />
    </SelectContainer>
  );
};
