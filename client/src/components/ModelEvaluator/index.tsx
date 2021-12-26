import React, { useState, useEffect, useContext } from "react";
import { SettingsContainer, Container } from "./style";
import { ModelSummary } from "../ModelSummary";
import { Dropzone } from "../Dropzone/index";
import { InputFlex } from "../../core-ui/Input";
import { Selection } from "../Selection/index";
import { IconButton } from "../../core-ui/Button";
import { ReactComponent as Hammer } from "../Icons/hammer.svg";
import { ReactComponent as Save } from "../Icons/save.svg";
import Papa from "papaparse";
import { UserContext } from "../../App";
import axios from "axios";
import { getCookie, CSRF } from "../CSRF";
import {
  FeatureContainer,
  FeatureWrapper,
  FeatureTitle,
} from "../../core-ui/Feature";
import {
  ModelEvaluatorProps,
  ModelName,
  ModelFolderName,
  Data,
  SelectData,
  Metrics,
} from "./types";

export const ModelEvaluator = ({
  currentModel,
}: ModelEvaluatorProps): React.ReactElement => {
  const [modelName, setModelName] = useState<ModelName>("");
  const [modelFolderName, setModelFolderName] = useState<ModelFolderName>("");
  const [data, setData] = useState<Data>("");
  const [features, setFeatures] = useState<SelectData>([]);
  const [predictors, setPredictors] = useState<SelectData>([]);
  const [response, setResponse] = useState<SelectData>();
  const [built, setBuilt] = useState<boolean>(false);
  const [filled, setFilled] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<Metrics>([]);
  const username = useContext(UserContext);

  useEffect(() => {
    setModelName("");
    setModelFolderName("");
    setMetrics([]);
  }, [currentModel]);

  useEffect(() => {
    var results = Papa.parse(data);
    try {
      let headers: any = results.data[0];
      let parsed = headers.map((name: string) => {
        return { value: name, label: name };
      });
      setFeatures(parsed);
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  useEffect(() => {
    setBuilt(false);
    if (formFilled()) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [currentModel, modelName, modelFolderName, predictors, response]);

  const buildModel = async () => {
    try {
      let model_type = currentModel;
      let results = await axios.post(
        `/api/${username}/build-model/`,
        {
          "model-type": model_type,
          "model-data": encodeURIComponent(data),
          "model-pred": predictors,
          "model-resp": response,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let metrics = Object.keys(results.data.metrics).map((metric) => {
        return {
          name: metric,
          value: results.data.metrics[metric],
        };
      });
      setMetrics(metrics);
      setBuilt(true);
    } catch (err) {
      setBuilt(false);
      console.log(err);
    }
  };

  const saveModel = async () => {
    try {
      let model_type = currentModel;
      await axios.post(
        `/api/${username}/save-model/`,
        {
          "model-name": modelName,
          "model-fold": modelFolderName,
          "model-type": model_type,
          "model-pred": predictors,
          "model-resp": response,
          "model-metric": metrics,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-CSRFToken": getCookie("csrftoken"),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const formFilled = (): boolean => {
    return (
      modelName !== "" &&
      modelFolderName !== "" &&
      data !== "" &&
      predictors !== undefined &&
      response !== undefined &&
      predictors.length !== 0 &&
      response.length !== 0
    );
  };

  return (
    <FeatureContainer>
      <FeatureWrapper height="70vh">
        <FeatureTitle>Configuration</FeatureTitle>
        <SettingsContainer>
          <InputFlex value={currentModel} readOnly />
          <InputFlex
            value={modelName}
            placeholder="Enter a model name"
            onChange={(e) => setModelName(e.target.value)}
          />
          <InputFlex
            value={modelFolderName}
            placeholder="Enter a folder name"
            onChange={(e) => setModelFolderName(e.target.value)}
          />
        </SettingsContainer>
        <Dropzone setData={setData} />
        <SettingsContainer>
          <Selection
            id="1"
            name={"Predictor Variables"}
            type={"multi"}
            options={features}
            placeholder="Select the predictor variables"
            isDisabled={features.length === 0}
            value={predictors}
            updateState={(selectedOptions: SelectData) => {
              setPredictors(selectedOptions);
            }}
          />
          <Selection
            id="2"
            name={"Response Variable"}
            type={"single"}
            options={features}
            placeholder="Select the response variable"
            isDisabled={features.length == 0}
            value={response}
            updateState={(selectedOptions: SelectData) => {
              setResponse(selectedOptions);
            }}
          />
        </SettingsContainer>
        <ModelSummary metrics={metrics} />
        <SettingsContainer>
          <Container>
            {filled ? (
              <IconButton
                onClick={() => {
                  buildModel();
                }}
              >
                <Hammer /> Build
              </IconButton>
            ) : (
              <IconButton disabled={true}>
                <Hammer /> Build
              </IconButton>
            )}
            {built ? (
              <IconButton
                onClick={() => {
                  saveModel();
                }}
              >
                <Save /> Save
              </IconButton>
            ) : (
              <IconButton disabled={true}>
                <Save /> Save
              </IconButton>
            )}
          </Container>
        </SettingsContainer>
      </FeatureWrapper>
    </FeatureContainer>
  );
};
