import React, { useState, useRef, useCallback, useEffect } from "react";
import * as XLSX from "xlsx";
import _ from "lodash";
import styled from "styled-components";

const FileAttachment = ({ setXlsxData }) => {
  const dragRef = useRef(null);
  const [file, setFile] = useState({});

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onChangeFiles = useCallback(async (e) => {
    let selectFile = {};

    if (e.type === "drop") {
      selectFile = e.dataTransfer.files[0];
    } else {
      selectFile = e.target.files[0];
    }

    if (
      selectFile.name.split(".")[1] === "xlsx" ||
      selectFile.name.split(".")[1] === "xls"
    ) {
      setFile(selectFile);

      const readFile = await readFileAsync(selectFile);

      const workbook = XLSX.read(readFile, {
        cellDates: true,
        dateNF: "yyyy-mm-dd",
        cellNF: true,
        raw: true,
        cellStyles: true,
      });

      const sheetList = workbook.SheetNames;

      sheetList.forEach((com, idx) => {
        const worksheet = workbook.Sheets[com];

        const json = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          blankrows: false,
          raw: false,
        });

        const json_max_length = _.maxBy(json.map((com) => com.length));

        const emtry_json = json.map((com) => {
          const new_arr = [];

          for (let i = 0; i < json_max_length; i++) {
            if (com[i] === undefined) {
              new_arr.push(null);
            } else {
              new_arr.push(com[i]);
            }
          }

          return new_arr;
        });

        setXlsxData((prev) => [
          ...prev,
          { id: idx, name: com, data: emtry_json },
        ]);
      });
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents, file]);

  return (
    <FileAttachmentDiv>
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        multiple={false}
        onChange={onChangeFiles}
        accept=".xlsx, .xls"
      />
      <FileAttachmentFileDiv
        className="fileAttachment-File"
        htmlFor="fileUpload"
        ref={dragRef}
      >
        <div>.xlsx, .xls 파일을 첨부하여 주시기 바랍니다.</div>
      </FileAttachmentFileDiv>
    </FileAttachmentDiv>
  );
};

export default FileAttachment;

const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};

const FileAttachmentDiv = styled.div`
  margin: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-File {
  }
`;

const FileAttachmentFileDiv = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 2px dashed black;
  border-radius: 20px;

  font-size: 18px;
  font-weight: bold;

  &-Dragging {
    background-color: black;
    color: white;
  }
`;
