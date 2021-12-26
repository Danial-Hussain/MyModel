import React, { useState } from "react";
import { ReactComponent as Info } from "../Icons/info.svg";
import {
  FeatureContainer,
  FeatureWrapper,
  FeatureTitle,
} from "../../core-ui/Feature";
import { ItemContainer, Item, ItemName } from "../../core-ui/ItemContainer";
import { Button } from "../../core-ui/Button";
import { Link } from "react-router-dom";
import { ModelSelectorProps, ModelItem } from "./types";
import { TextBox } from "./style";
import { model_types } from "../../constants/model_types";

export const ModelSelector = ({
  setSelectedModelType,
}: ModelSelectorProps): React.ReactElement => {
  const [models, setModels] = useState<ModelItem[]>(model_types);

  const updateSelectedModel = (id: string) => {
    setModels(
      models.map((obj) => {
        if (obj.id == id) {
          return { ...obj, selected: true };
        } else {
          return { ...obj, selected: false };
        }
      })
    );
  };

  const buildSelectedModel = () => {
    let modelToBuild = models.filter((obj) => obj.selected)[0].name;
    setSelectedModelType(modelToBuild);
  };

  return (
    <FeatureContainer>
      <FeatureWrapper height="70vh">
        <FeatureTitle>Create New Model</FeatureTitle>
        <TextBox>Regression</TextBox>
        <ItemContainer>
          {models.map((obj) => {
            if (obj.type === "Regressor") {
              return (
                <Item
                  id={obj.id}
                  selected={obj.selected}
                  onClick={(e) => updateSelectedModel(e.currentTarget.id)}
                >
                  <ItemName>{obj.name}</ItemName>
                  <Link
                    to={"/learn"}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <Info />
                  </Link>
                </Item>
              );
            }
          })}
        </ItemContainer>
        <TextBox>Classification</TextBox>
        <ItemContainer>
          {models.map((obj) => {
            if (obj.type === "Classifier") {
              return (
                <Item
                  id={obj.id}
                  selected={obj.selected}
                  onClick={(e) => updateSelectedModel(e.currentTarget.id)}
                >
                  <ItemName>{obj.name}</ItemName>
                  <Link
                    to={"/learn"}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <Info />
                  </Link>
                </Item>
              );
            }
          })}
        </ItemContainer>
        <Button onClick={() => buildSelectedModel()}>Select Model</Button>
      </FeatureWrapper>
    </FeatureContainer>
  );
};
