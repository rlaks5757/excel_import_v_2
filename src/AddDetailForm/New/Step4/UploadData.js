import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import DetailComponent from "./DetailComponent";

const UploadData = ({
  upperFormSheet,
  detailFormSheet,
  finaluploadData,
  height,
}) => {
  const [dataState, setDataState] = useState({
    sort: [],
  });

  const [dataResult, setDataResult] = useState(
    process(finaluploadData, dataState)
  );

  const upper_form_header = useMemo(() => {
    return upperFormSheet["matching_data"].filter(
      (com) => com.field_name !== ""
    );
  }, [upperFormSheet]);

  const detail_form_header = useMemo(() => {
    return detailFormSheet["matching_data"].filter(
      (com) => com.field_name !== ""
    );
  }, [detailFormSheet]);

  const dataStateChange = (event) => {
    setDataResult(process(finaluploadData, event.dataState));
    setDataState(event.dataState);
  };

  const expandChange = (event) => {
    const isExpanded =
      event.dataItem.expanded === undefined
        ? event.dataItem.aggregates
        : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;

    setDataResult({
      ...dataResult,
      data: [...dataResult.data],
    });
  };

  const DetailComponentAdd = (props) => {
    return (
      <DetailComponent {...props} detail_form_header={detail_form_header} />
    );
  };

  return (
    <UploadDataDiv>
      <Grid
        style={{ maxHeight: height - 6 }}
        data={dataResult}
        rowHeight={30}
        onDataStateChange={dataStateChange}
        detail={DetailComponentAdd}
        expandField="expanded"
        onExpandChange={expandChange}
      >
        <GridColumn field={"upper_ID"} title={"Upper_ID"} />
        {upper_form_header.map((com, idx) => {
          return (
            <GridColumn
              field={com.field_name}
              title={com.label_name}
              key={idx}
            />
          );
        })}
      </Grid>
    </UploadDataDiv>
  );
};

export default UploadData;

const UploadDataDiv = styled.div``;
