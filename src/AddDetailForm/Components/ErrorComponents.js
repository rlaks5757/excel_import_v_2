import React, { useMemo, useState, useRef } from "react";
import styled from "styled-components";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { ExcelExport } from "@progress/kendo-react-excel-export";

const ErrorComponents = ({
  upperFormSheet,
  detailFormSheet,
  errorMessage,
  height,
  width,
}) => {
  const _export = useRef();

  const upper_form_heaer = useMemo(() => {
    return upperFormSheet["matching_data"];
  }, [upperFormSheet]);

  const detail_form_header = useMemo(() => {
    return detailFormSheet["matching_data"];
  }, [detailFormSheet]);

  const table_data = useMemo(() => {
    return errorMessage.map((com) => {
      return { ...com, upload_status: com._record_status === "success" };
    });
  }, [errorMessage]);

  const [dataState, setDataState] = useState({
    sort: [],
  });

  const [dataResult, setDataResult] = useState(process(table_data, dataState));

  const dataStateChange = (event) => {
    setDataResult(process(table_data, event.dataState));
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

  const excelExport = () => {
    if (_export.current) {
      _export.current.save();
    }
  };

  return (
    <ErrorComponentsDiv>
      <ErrorComponentsTitleBox>
        <ErrorComponentsTitle>
          아래의 Table을 확인 하신 뒤 재 업로드 부탁드립니다. (업로드 성공한
          건에 대해서는 삭제 필요)
        </ErrorComponentsTitle>
        <div>
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            onClick={excelExport}
          >
            Export to Excel
          </button>
        </div>
      </ErrorComponentsTitleBox>
      <ExcelExport data={dataResult.data} ref={_export}>
        <Grid
          style={{ maxHeight: height - 40, maxWidth: width }}
          data={dataResult}
          rowHeight={30}
          onDataStateChange={dataStateChange}
          detail={DetailComponentAdd}
          expandField="expanded"
          onExpandChange={expandChange}
        >
          {errorMessage.length > 0 &&
            Object.keys(dataResult.data[0]).map((com, idx) => {
              if (
                com !== "_bp_lineitems" &&
                com !== "status" &&
                com !== "expanded"
              ) {
                const find_obj = upper_form_heaer.find(
                  (com2) => com2.field_name === com
                );
                return (
                  <GridColumn
                    field={com}
                    title={find_obj ? find_obj["label_name"] : ""}
                    key={idx}
                  />
                );
              } else {
                return null;
              }
            })}
        </Grid>
      </ExcelExport>
    </ErrorComponentsDiv>
  );
};

export default ErrorComponents;

const ErrorComponentsDiv = styled.div``;

const ErrorComponentsTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const ErrorComponentsTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const DetailComponentDiv = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const DetailComponentTitle = styled.div`
  font-size: 1rem;
  font-weight: bolder;
`;

const DetailComponent = (props) => {
  const { detail_form_header, dataItem } = props;

  const { _bp_lineitems } = dataItem;

  return (
    <DetailComponentDiv>
      <DetailComponentTitle>Detail Form Data Table</DetailComponentTitle>
      <Grid style={{ maxHeight: 300 }} data={_bp_lineitems} rowHeight={30}>
        {_bp_lineitems.length > 0 &&
          Object.keys(_bp_lineitems[0]).map((com, idx) => {
            const find_obj = detail_form_header.find(
              (com2) => com2.field_name === com
            );

            return (
              <GridColumn
                field={com}
                title={find_obj ? find_obj["label_name"] : ""}
                key={idx}
              />
            );
          })}
      </Grid>
    </DetailComponentDiv>
  );
};
