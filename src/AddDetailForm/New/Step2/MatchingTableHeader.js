import React, { useEffect, useState } from "react";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import SelectBP from "../../../Components/SelectBP/SelectBP";
import MatchingTableHeaderComponents from "../../Components/MatchingTableHeaderComponents";
import styled from "styled-components";

const MatchingTableHeader = ({
  upperFormSheet,
  detailFormSheet,
  setUpperFormSheet,
  setDetailFormSheet,
  setStepBoolean,
  step,
  height,
  width,
}) => {
  const [selectBPToggle, setSelectBPToggle] = useState(true);
  const [selectBPData, setSelectBPData] = useState({
    bp_name: "",
    label_name: "",
    upper_form: [],
    line_item: [],
  });

  useEffect(() => {
    // const upper_form_header = upperFormSheet["header"];
    // const detail_form_header = detailFormSheet["header"];

    const selectBPData_upper_list = selectBPData["upper_form"];
    const selectBPData_detail_list = selectBPData["line_item"];

    const upper_form_matching_header = upperFormSheet["matching_data"].filter(
      (com) => com.label_name !== "" && com.required
    );
    const detail_form_matching_header = detailFormSheet["matching_data"].filter(
      (com) => com.label_name !== "" && com.required
    );

    if (
      selectBPData_upper_list.filter((com) => com.required).length <=
        upper_form_matching_header.length &&
      selectBPData_detail_list.filter((com) => com.required).length <=
        detail_form_matching_header.length
    ) {
      setStepBoolean((prev) => ({ ...prev, [step]: true }));
    } else {
      setStepBoolean((prev) => ({ ...prev, [step]: false }));
    }
  }, [upperFormSheet, detailFormSheet, step, selectBPData]);

  return (
    <MatchingTableHeaderDiv>
      {selectBPToggle && (
        <SelectBP
          setSelectBPToggle={setSelectBPToggle}
          selectBPData={selectBPData}
          setSelectBPData={setSelectBPData}
        />
      )}
      <GridLayout
        gap={{
          rows: 6,
          cols: 20,
        }}
        rows={[
          {
            height: height - 6,
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
          <MatchingTableHeaderComponents
            selectBPData={selectBPData}
            formType={"upper_form"}
            formSheet={upperFormSheet}
            setFormSheet={setUpperFormSheet}
          />
        </GridLayoutItem>
        <GridLayoutItem row={1} col={2}>
          <MatchingTableHeaderComponents
            selectBPData={selectBPData}
            formType={"line_item"}
            formSheet={detailFormSheet}
            setFormSheet={setDetailFormSheet}
          />
        </GridLayoutItem>
      </GridLayout>
    </MatchingTableHeaderDiv>
  );
};

export default MatchingTableHeader;

const MatchingTableHeaderDiv = styled.div``;
