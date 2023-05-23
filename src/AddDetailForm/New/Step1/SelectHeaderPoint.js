import React, { useMemo, useEffect } from "react";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styled from "styled-components";
import { create_table_header } from "../../../Functions/create_table_header";
import { reset_obj } from "../../../Components/PublicCompoments/reset_obj";

const SelectHeaderPoint = ({
  xlsxData,
  setStepBoolean,
  setUpperFormSheet,
  setDetailFormSheet,
  upperFormSheet,
  detailFormSheet,
  step,
  height,
  width,
  detailFormBoolean,
  setDetailFormBoolean,
}) => {
  const sheetList = useMemo(() => {
    return xlsxData.map((com) => com.name);
  }, [xlsxData]);

  const handleComboboxValue = (e, type) => {
    const { value } = e.target;

    if (value === null) {
      if (type === "upper") {
        setUpperFormSheet(reset_obj);
      } else {
        setDetailFormSheet(reset_obj);
      }
    } else {
      const find_data = xlsxData.find((com) => com.name === value);

      if (type === "upper") {
        if (detailFormSheet.name === value) {
          setDetailFormSheet(reset_obj);
        }
        setUpperFormSheet((prev) => ({
          ...prev,
          name: value,
          data: find_data["data"],
        }));
      } else {
        if (upperFormSheet.name === value) {
          setUpperFormSheet(() => reset_obj);
        }
        setDetailFormSheet((prev) => ({
          ...prev,
          name: value,
          data: find_data["data"],
        }));
      }
    }
  };

  const selectHeaderSlicePoint = (value, type) => {
    const num_value = Number(value) + 1;

    if (type === "upper") {
      const { data } = upperFormSheet;

      const table_header = data.slice(0, num_value);
      const table_body = data.slice(num_value, data.length);

      setUpperFormSheet((prev) => ({
        ...prev,
        point: value,
        header: create_table_header(table_header, num_value),
        body: table_body,
        matching_data: create_table_header(table_header, num_value).map(() => ({
          field_name: "",
          label_name: "",
          data_type: "",
          required: true,
        })),
      }));
    } else {
      const { data } = detailFormSheet;

      const table_header = data.slice(0, num_value);
      const table_body = data.slice(num_value, data.length);

      setDetailFormSheet((prev) => ({
        ...prev,
        point: value,
        header: create_table_header(table_header, num_value),
        body: table_body,
        matching_data: create_table_header(table_header, num_value).map(() => ({
          field_name: "",
          label_name: "",
          data_type: "",
          required: true,
        })),
      }));
    }
  };

  useEffect(() => {
    if (upperFormSheet.header.length > 0 && detailFormSheet.header.length > 0) {
      setStepBoolean((prev) => ({ ...prev, [step]: true }));
    } else {
      setStepBoolean((prev) => ({ ...prev, [step]: false }));
    }
  }, [upperFormSheet, detailFormSheet, step]);

  const handleFieldLabel = (arr) => {
    const create_label = arr.map((com, idx) => {
      return (
        <RadioFieldLabelDetail key={idx}>
          <span>{com}</span>
        </RadioFieldLabelDetail>
      );
    });

    return <RadioFieldLabel>{create_label}</RadioFieldLabel>;
  };

  return (
    <SelectHeaderPointDiv>
      <GridLayout
        gap={{
          rows: 6,
          cols: 20,
        }}
        rows={[
          {
            height: 120,
          },
          {
            height: height - 120 - 6 - 45,
          },
          {
            height: 35,
          },
        ]}
        cols={[
          {
            width: (width - 10) * 0.5,
          },
          {
            width: (width - 10) * 0.5,
          },
        ]}
      >
        <GridLayoutItem row={1} col={1}>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontWeight: "bolder" }}
            >
              Upper Form으로 사용할 시트를 선택하여 주시기 바랍니다.
            </FormLabel>

            <ComboBox
              style={{
                marginTop: "10px",
                width: (width - 10) * 0.4,
              }}
              value={upperFormSheet.name}
              data={sheetList}
              onChange={(e) => handleComboboxValue(e, "upper")}
            />
          </FormControl>
        </GridLayoutItem>
        <GridLayoutItem
          col={1}
          row={2}
          rowSpan={2}
          className="selectHeaderPointBody"
        >
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontWeight: "bolder" }}
            >
              사용할 Table Header 종료 지점을 선택하여 주시기 바랍니다.
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={upperFormSheet.point}
              name="radio-buttons-group"
              onChange={(e) => {
                selectHeaderSlicePoint(e.target.value, "upper");
              }}
              sx={{ marginTop: "10px" }}
            >
              {upperFormSheet.data.map((com, idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    value={idx}
                    control={<Radio />}
                    label={handleFieldLabel(com)}
                    name={String(idx)}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </GridLayoutItem>
        <GridLayoutItem row={1} col={2}>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontWeight: "bolder" }}
            >
              Detail Form(Line Item)으로 사용할 시트를 선택하여 주시기 바랍니다.
            </FormLabel>
            <ComboBox
              style={{
                marginTop: "10px",
                width: (width - 5) * 0.4,
              }}
              value={detailFormSheet.name}
              data={sheetList}
              onChange={(e) => handleComboboxValue(e, "detail")}
              disabled={!detailFormBoolean}
            />
          </FormControl>
        </GridLayoutItem>
        <GridLayoutItem row={2} col={2} className="selectHeaderPointBody">
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontWeight: "bolder" }}
            >
              사용할 Table Header 종료 지점을 선택하여 주시기 바랍니다.
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={detailFormSheet.point}
              name="radio-buttons-group"
              onChange={(e) => {
                selectHeaderSlicePoint(e.target.value, "detail");
              }}
              sx={{ marginTop: "10px" }}
            >
              {detailFormSheet.data.map((com, idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    value={idx}
                    control={<Radio />}
                    label={handleFieldLabel(com)}
                    name={String(idx)}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </GridLayoutItem>
        <GridLayoutItem row={3} col={2} className="selectHeaderPointBody">
          <div>asdf</div>
        </GridLayoutItem>
      </GridLayout>
    </SelectHeaderPointDiv>
  );
};

export default SelectHeaderPoint;

const SelectHeaderPointDiv = styled.div`
  height: 100%;

  .selectHeaderPointBody {
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .selectHeaderPointBody::-webkit-scrollbar {
    display: none;
  }
`;

const RadioFieldLabel = styled.div`
  display: flex;
  text-overflow: ellipsis;
`;

const RadioFieldLabelDetail = styled.div`
  align-items: center;
  padding: 10px;
  width: 120px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis !important;
  white-space: nowrap;
  border: 1px solid lightgrey;
`;
