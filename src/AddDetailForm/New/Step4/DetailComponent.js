import React from "react";
import styled from "styled-components";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

const DetailComponent = (props) => {
  const { detail_form_header, dataItem } = props;

  const { _bp_lineitems } = dataItem;

  return (
    <DetailComponentDiv>
      <DetailComponentTitle>Detail Form Data Table</DetailComponentTitle>
      <Grid style={{ maxHeight: 300 }} data={_bp_lineitems} rowHeight={30}>
        <GridColumn field={"detail_ID"} title={"Detail_ID"} />
        {detail_form_header.map((com, idx) => {
          return (
            <GridColumn
              field={com.field_name}
              title={com.label_name}
              key={idx}
            />
          );
        })}
      </Grid>
    </DetailComponentDiv>
  );
};

// const detailComponentColorList = ["rgb(236, 125, 49)", "rgb(165, 165, 165)"];

const DetailComponentDiv = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const DetailComponentDivBox = styled.div`
  width: 50%;
  margin: 0 10px;
`;

const DetailComponentTitle = styled.div`
  font-size: 1rem;
  font-weight: bolder;
`;

export default DetailComponent;
