import React, { useCallback, useState } from "react";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import styled from "styled-components";
import dayjs from "dayjs";
import StepperComponent from "../../Components/Stepper/StepperComponent";
import FileAttachment from "../../Components/FileAttatchment/FileAttachment";
import {
  reset_obj,
  step_obj,
} from "../../Components/PublicCompoments/reset_obj";
import { StepControlButtonBox } from "../../Components/PublicStyled/PublicStyled";

const UpdateUpload = ({ height, width }) => {
  const [step, setStep] = useState(0);
  const [stepBoolean, setStepBoolean] = useState(step_obj);
  const [xlsxData, setXlsxData] = useState([]);
  const [upperFormSheet, setUpperFormSheet] = useState(reset_obj);
  const [detailFormSheet, setDetailFormSheet] = useState(reset_obj);

  const [unifierUpperFormSheet, setUnifierUpperFormSheet] = useState([]);
  const [unifierDetailFormSheet, setUnifierDetailFormSheet] = useState([]);

  const [finaluploadData, setFinalUploadData] = useState([]);
  const [errorBoolean, setErrorBoolean] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const handleNewUploadStep = useCallback(() => {
    switch (step) {
      case 0:
        return (
          <>
            {xlsxData.length === 0 && (
              <FileAttachment setXlsxData={setXlsxData} />
            )}
          </>
        );

      default:
        return "";
    }
  }, [step, xlsxData, height, width, upperFormSheet, detailFormSheet]);

  const handleImportStep = (type) => {
    if (type === "next") {
      if (step === 2) {
        const matching_data_upper = upperFormSheet["matching_data"].filter(
          (com) => com.field_name !== ""
        );
        const matching_data_detail = detailFormSheet["matching_data"].filter(
          (com) => com.field_name !== ""
        );

        const transfer_data_format = upperFormSheet.complete_table_data.map(
          (com) => {
            const obj = {};

            Object.keys(com).forEach((com2) => {
              const find_obj = matching_data_upper.find(
                (com3) => com3.field_name === com2
              );
              if (!find_obj) {
                obj[com2] = com[com2];
              } else {
                if (find_obj["data_type"] === "Date") {
                  obj[com2] = dayjs(com[com2]).format("MM/DD/YYYY 00:00:00");
                } else {
                  obj[com2] = com[com2];
                }
              }
            });
            const _bp_lineitems = detailFormSheet.complete_table_data
              .filter((com2) => com2.upper_ID === com.upper_ID)
              .map((com2) => {
                const obj_2 = {};

                Object.keys(com2).forEach((com3) => {
                  const find_obj = matching_data_detail.find(
                    (com4) => com4.field_name === com3
                  );
                  if (!find_obj) {
                    obj_2[com3] = com2[com3];
                  } else {
                    if (find_obj["data_type"] === "Date") {
                      obj_2[com3] = dayjs(com2[com3]).format(
                        "MM/DD/YYYY 00:00:00"
                      );
                    } else {
                      obj_2[com3] = com2[com3];
                    }
                  }
                });

                return obj_2;
              });

            return {
              ...obj,
              _bp_lineitems,
            };
          }
        );

        setFinalUploadData(transfer_data_format);
      } else {
        setFinalUploadData([]);
      }

      setStepBoolean((prev) => ({ ...prev, [step]: false }));
      setStep((prev) => prev + 1);
    } else {
      if (step === 2) {
        setUpperFormSheet((prev) => ({ ...prev, complete_table_data: [] }));
        setDetailFormSheet((prev) => ({ ...prev, complete_table_data: [] }));
      }

      setStep((prev) => prev - 1);
      setFinalUploadData([]);
    }
  };

  return (
    <UpdateUploadDiv>
      <GridLayout
        gap={{
          rows: 6,
          cols: 10,
        }}
        rows={[
          {
            height: 59,
          },
          {
            height: height - 109 - 12,
          },
          {
            height: 50,
          },
        ]}
        cols={[
          {
            width: width,
          },
        ]}
      >
        <GridLayoutItem row={1} col={1}>
          <StepperComponent step={step} width={width} />
        </GridLayoutItem>
        <GridLayoutItem row={2} col={1}>
          {handleNewUploadStep()}
        </GridLayoutItem>
        <GridLayoutItem row={3} col={1}>
          <StepControlButtonBox>
            <Button
              onClick={() => handleImportStep("prev")}
              disabled={step === 0}
            >
              Previous
            </Button>
            {step === 3 ? (
              // <Button onClick={() => request_upload()}>Upload Data</Button>
              <Button>Upload Data</Button>
            ) : (
              <Button
                onClick={() => handleImportStep("next")}
                disabled={!stepBoolean[step]}
              >
                Next
              </Button>
            )}
          </StepControlButtonBox>
        </GridLayoutItem>
      </GridLayout>
    </UpdateUploadDiv>
  );
};

export default UpdateUpload;

const UpdateUploadDiv = styled.div``;
