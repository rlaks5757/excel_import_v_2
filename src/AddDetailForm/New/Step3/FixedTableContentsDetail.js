import React, { useMemo, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styled from "styled-components";
import RemoveCell from "./RemoveCell";
import DetailDropDownCell from "./DetailDropDownCell";
import { handle_editor_data_type } from "../../../Functions/public_function";

const FixedTableContentsDetail = ({
  upper_table_data,
  detail_table_data,
  set_detail_table_data,
  width,
  height,
}) => {
  const [editID, setEditID] = useState(null);

  const { header, body } = detail_table_data;

  const upper_id_list = useMemo(() => {
    return upper_table_data.body.map((com) => ({ value: com.upper_ID }));
  }, [upper_table_data]);

  const CommandCell = (props) => (
    <RemoveCell {...props} remove={remove} close_editng={close_editng} />
  );

  const DropDownCell = (props) => (
    <DetailDropDownCell {...props} upper_id_list={upper_id_list} />
  );

  // const DropDownCell = (props) => {
  //   <DetailDropDownCell {...props} upper_id_list={upper_id_list} />;
  // };

  const close_editng = () => {
    setEditID(null);
  };

  const remove = (dataItem) => {
    const deleteItem = (item) => {
      let index = body.findIndex(
        (record) => record.detail_ID === item.detail_ID
      );
      body.splice(index, 1);
      return body;
    };

    const newData = deleteItem(dataItem);
    set_detail_table_data((prev) => ({ ...prev, body: newData }));
  };

  const rowClick = (event) => {
    setEditID(event.dataItem.detail_ID);
  };

  const itemChange = (event) => {
    const inEditID = event.dataItem.detail_ID;
    const field = event.field || "";

    const newData = body.map((item) =>
      item.detail_ID === inEditID
        ? {
            ...item,
            [field]: event.value,
          }
        : item
    );

    set_detail_table_data((prev) => ({ ...prev, body: newData }));
  };

  const addRecord = () => {
    const newRecord = {};

    header.forEach((com) => {
      if (com["field_name"] === "detail_ID") {
        newRecord[com["field_name"]] = new Date().getMilliseconds();
      } else {
        newRecord[com["field_name"]] = "";
      }
    });

    set_detail_table_data((prev) => ({ ...prev, body: [newRecord, ...body] }));
    setEditID(newRecord.detail_ID);
  };

  return (
    <FixedTableContentsUpperDiv>
      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          sx={{ fontWeight: "bolder", marginBottom: "10px" }}
        >
          하위에 넣고자 하는 Item에 upper_ID를 기입하여 주시기 바랍니다.
        </FormLabel>
      </FormControl>
      <Grid
        style={{ maxHeight: height - 23 }}
        data={body.map((item) => ({
          ...item,
          inEdit: item.detail_ID === editID,
        }))}
        editField="inEdit"
        onRowClick={rowClick}
        onItemChange={itemChange}
      >
        <GridToolbar>
          <div>
            <button
              title="Add new"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={addRecord}
            >
              Add new
            </button>
          </div>

          <div>
            <button
              title="Add new"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={close_editng}
              disabled={!editID}
            >
              Close Edit
            </button>
          </div>
        </GridToolbar>
        {header.map((com, idx) => {
          if (com.field_name !== "upper_ID") {
            return (
              <Column
                field={com.field_name}
                title={com.label_name}
                width="200px"
                key={idx}
                editable={com.field_name !== "detail_ID"}
                editor={handle_editor_data_type(com.data_type)}
                format={"{00:d}"}
              />
            );
          } else {
            return (
              <Column
                field={com.field_name}
                title={com.label_name}
                cell={DropDownCell}
                width="200px"
                key={idx}
                editable={true}
              />
            );
          }
        })}
        <Column cell={CommandCell} width="100px" />
      </Grid>
    </FixedTableContentsUpperDiv>
  );
};

export default FixedTableContentsDetail;

const FixedTableContentsUpperDiv = styled.div``;
