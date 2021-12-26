import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneContainer, DropzoneText } from "./style";
import { FileName, DropzoneProps } from "./types";

export const Dropzone = ({ setData }: DropzoneProps): React.ReactElement => {
  const [fileName, setFileName] = useState<FileName>("");

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    let name = "";
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading failed");
    reader.onload = () => {
      let result: any = reader.result;
      console.log(result);
      setData(result);
      setFileName(name);
    };
    acceptedFiles.forEach((file: any) => {
      name = file.name;
      reader.readAsBinaryString(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "application/vnd.ms-excel,text/plain",
    multiple: false,
    onDrop,
  });
  return (
    <DropzoneContainer
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      <input {...getInputProps()} />
      <DropzoneText>
        {!isDragActive &&
          fileName === "" &&
          "Click here or drop a file to upload!"}
        {!isDragActive && fileName !== "" && fileName}
        {isDragActive && !isDragReject && "Valid file type!"}
        {isDragReject && "Invalid file type!"}
      </DropzoneText>
    </DropzoneContainer>
  );
};
