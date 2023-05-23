import React, { useEffect, useState } from "react";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import styled from "styled-components";
import FixedTableContentsUpper from "./FixedTableContentsUpper";
import FixedTableContentsDetail from "./FixedTableContentsDetail";

const FixedTableContents = ({
  upperFormSheet,
  detailFormSheet,
  setUpperFormSheet,
  setDetailFormSheet,
  setStepBoolean,
  step,
  height,
  width,
}) => {
  const [upper_table_data, set_upper_table_data] = useState({
    header: [],
    body: [],
  });

  const [detail_table_data, set_detail_table_data] = useState({
    header: [],
    body: [],
  });

  useEffect(() => {
    const upper_matching_data = [...upperFormSheet["matching_data"]].filter(
      (com) => com.field_name !== ""
    );
    const detail_matching_data = [...detailFormSheet["matching_data"]].filter(
      (com) => com.field_name !== ""
    );

    let upper_table_data_2 = [...upperFormSheet["table_data"]];
    let detail_table_data_2 = [...detailFormSheet["table_data"]];

    if (upperFormSheet["complete_table_data"].length > 0) {
      upper_table_data_2 = [...upperFormSheet["complete_table_data"]];
    }

    if (detailFormSheet["complete_table_data"].length > 0) {
      detail_table_data_2 = [...detailFormSheet["complete_table_data"]];
    }

    if (upper_matching_data[0]["field_name"] !== "upper_ID") {
      upper_matching_data.unshift({
        field_name: "upper_ID",
        label_name: "Upper_ID",
        data_type: "String",
        required: true,
      });

      const upper_table_data_add = upper_table_data_2.map((com, idx) => {
        const obj = {
          ...com,
          upper_ID: com.upper_ID ? com.upper_ID : "create_" + (idx + 1),
        };

        return obj;
      });

      set_upper_table_data((prev) => ({
        ...prev,
        header: upper_matching_data,
        body: upper_table_data_add,
      }));
    }

    if (detail_matching_data[0]["field_name"] !== "detail_ID") {
      detail_matching_data.push({
        field_name: "upper_ID",
        label_name: "Upper_ID",
        data_type: "String",
        required: true,
      });

      detail_matching_data.unshift({
        field_name: "detail_ID",
        label_name: "Detail_ID",
        data_type: "String",
        required: true,
      });

      const detail_table_data_add = detail_table_data_2.map((com, idx) => {
        const obj = {
          ...com,
          upper_ID: com.upper_ID ? com.upper_ID : "",
          detail_ID: com.detail_ID ? com.detail_ID : idx + 1,
        };

        return obj;
      });

      set_detail_table_data((prev) => ({
        ...prev,
        header: detail_matching_data,
        body: detail_table_data_add,
      }));
    }
  }, []);

  useEffect(() => {
    const matching_complete_check = detail_table_data.body.filter(
      (com) => com.upper_ID === ""
    );

    if (matching_complete_check.length === 0) {
      setUpperFormSheet((prev) => ({
        ...prev,
        complete_table_data: upper_table_data.body,
      }));
      setDetailFormSheet((prev) => ({
        ...prev,
        complete_table_data: detail_table_data.body,
      }));
      setStepBoolean((prev) => ({ ...prev, [step]: true }));
    } else {
      setStepBoolean((prev) => ({ ...prev, [step]: false }));
    }
  }, [upper_table_data, detail_table_data]);

  return (
    <FixedTableContentsDiv>
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
          <FixedTableContentsUpper
            upper_table_data={upper_table_data}
            set_upper_table_data={set_upper_table_data}
            width={(width - 10) * 0.5}
            height={height - 6}
          />
        </GridLayoutItem>
        <GridLayoutItem row={1} col={2}>
          <FixedTableContentsDetail
            upper_table_data={upper_table_data}
            detail_table_data={detail_table_data}
            set_detail_table_data={set_detail_table_data}
            width={(width - 10) * 0.5}
            height={height - 6}
          />
        </GridLayoutItem>
      </GridLayout>
    </FixedTableContentsDiv>
  );
};

export default FixedTableContents;

const FixedTableContentsDiv = styled.div``;
