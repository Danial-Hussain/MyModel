import React, { useContext, useState, useEffect } from "react";
import { UtilityContainer, AddFolder, FolderStatus } from "./style";
import { Input } from "../../core-ui/Input";
import { Button } from "../../core-ui/Button";
import {
  FeatureContainer,
  FeatureWrapper,
  FeatureTitle,
} from "../../core-ui/Feature";
import {
  ItemContainer,
  ItemContainerEmpty,
  Item,
  SubItem,
  ItemName,
} from "../../core-ui/ItemContainer";
import { Modal } from "../Modal/index";
import { ReactComponent as ChevronDown } from "../Icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../Icons/chevron-up.svg";
import { ReactComponent as Empty } from "../Icons/empty.svg";
import { FolderStatus as Status, Folder, InputField } from "./types";
import axios from "axios";
import { UserContext } from "../../App";

export const ModelLoader = (): React.ReactElement => {
  const [data, setData] = useState<Folder[]>([]);
  const [folderInput, setFolderInput] = useState<InputField>("");
  const [folderStatus, setFolderStatus] = useState<Status>("null");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const username = useContext(UserContext);

  useEffect(() => {
    getData();
  }, []);

  const updateSelectedFolder = (id: string) => {
    setData(
      data.map((value) => {
        if (value.id.toString() === id) {
          return {
            ...value,
            models: value.models.map((model) => {
              return { ...model, selected: false };
            }),
            selected: !value.selected,
          };
        } else {
          return value;
        }
      })
    );
  };

  const updateSelectedModel = (folderId: string, modelId: string) => {
    setData(
      data.map((value) => {
        if (value.id.toString() === folderId) {
          return {
            ...value,
            models: value.models.map((model) => {
              if (model.name === modelId) {
                return { ...model, selected: !model.selected };
              } else {
                return { ...model, selected: false };
              }
            }),
          };
        } else {
          return {
            ...value,
            models: value.models.map((model) => {
              return { ...model, selected: false };
            }),
          };
        }
      })
    );
  };

  const addFolder = (folderName: InputField) => {
    let exists = data.some((datapoint) => datapoint.name === folderName);
    if (!exists) {
      setData([
        ...data,
        { id: data.length + 1, name: folderName, models: [], selected: false },
      ]);
      folderStatus === "success1"
        ? setFolderStatus("success2")
        : setFolderStatus("success1");
    } else {
      folderStatus === "failed1"
        ? setFolderStatus("failed2")
        : setFolderStatus("failed1");
    }
  };

  const getData = async () => {
    try {
      let models = await axios.post(
        `/api/${username}/get-models/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data: Folder[] = [];
      models.data.map((mod: any) => {
        let fields = mod.fields;
        let model_name = fields.model_name;
        let folder_name = fields.folder_name;
        let created_at = fields.created_at;
        let metrics = JSON.parse(fields.metrics);
        let model_type = fields.model_type;
        let predictors = JSON.parse(fields.predictors);
        let response = JSON.parse(fields.response);
        let f_idx = data.findIndex((d) => d.name === folder_name);
        if (f_idx !== -1) {
          data[f_idx].models.push({
            name: model_name,
            type: model_type,
            created_date: created_at,
            predictors: predictors,
            response: response,
            metrics: metrics,
            selected: false,
          });
        } else {
          data.push({
            id: data.length,
            name: folder_name,
            models: [
              {
                name: model_name,
                type: model_type,
                created_date: created_at,
                predictors: predictors,
                response: response,
                metrics: metrics,
                selected: false,
              },
            ],
            selected: false,
          });
        }
      });
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {modalIsOpen && (
        <Modal
          data={data
            .find((datapoint) =>
              datapoint.models.find((model) => model.selected === true)
            )
            ?.models.find((model) => model.selected === true)}
          updateModalStatus={setModalIsOpen}
        />
      )}
      <FeatureContainer>
        <FeatureWrapper height="70vh">
          <FeatureTitle>PreLoad a Model</FeatureTitle>
          <UtilityContainer>
            <Input
              type="text"
              placeholder="Type a folder name"
              onChange={(e) => setFolderInput(e.target.value)}
            ></Input>
            <AddFolder onClick={() => addFolder(folderInput)}>➕</AddFolder>
          </UtilityContainer>
          {folderStatus == "success1" && (
            <FolderStatus>Folder Added</FolderStatus>
          )}
          {folderStatus == "success2" && (
            <FolderStatus>Folder Added</FolderStatus>
          )}
          {folderStatus == "failed1" && (
            <FolderStatus>Invalid Folder Name</FolderStatus>
          )}
          {folderStatus == "failed2" && (
            <FolderStatus>Invalid Folder Name</FolderStatus>
          )}
          <ItemContainer>
            {data.length === 0 && (
              <ItemContainerEmpty>
                <Empty />
                <ItemName>No Folders Yet!</ItemName>
              </ItemContainerEmpty>
            )}
            {data.length !== 0 &&
              data.map((obj) => {
                return (
                  <>
                    <Item
                      id={obj.id.toString()}
                      selected={obj.selected}
                      onClick={(e) => updateSelectedFolder(e.currentTarget.id)}
                    >
                      <ItemName>{obj.name}</ItemName>
                      {obj.selected && <ChevronUp />}
                      {!obj.selected && <ChevronDown />}
                    </Item>
                    <>
                      {obj.selected &&
                        obj.models.map((model) => (
                          <SubItem
                            id={model.name}
                            selected={model.selected}
                            onClick={(e) => {
                              updateSelectedModel(
                                obj.id.toString(),
                                e.currentTarget.id
                              );
                            }}
                          >
                            {model.name}
                          </SubItem>
                        ))}
                      {obj.selected && obj.models.length === 0 && (
                        <SubItem id={"temp"} selected={false}>
                          No Models Created
                        </SubItem>
                      )}
                    </>
                  </>
                );
              })}
          </ItemContainer>
          <Button onClick={() => setModalIsOpen(true)}>Load Model</Button>
        </FeatureWrapper>
      </FeatureContainer>
    </>
  );
};
