import React, { useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styled from "styled-components";
import RemoveCell from "./RemoveCell";
import { handle_editor_data_type } from "../../../Functions/public_function";

const FixedTableContentsUpper = ({
  upper_table_data,
  set_upper_table_data,
  height,
}) => {
  const { header, body } = upper_table_data;
  const [editID, setEditID] = useState(null);
  const rowClick = (event) => {
    setEditID(event.dataItem.upper_ID);
  };

  const CommandCell = (props) => (
    <RemoveCell {...props} remove={remove} close_editng={close_editng} />
  );

  const remove = (dataItem) => {
    const deleteItem = (item) => {
      let index = body.findIndex((record) => record.upper_ID === item.upper_ID);
      body.splice(index, 1);
      return body;
    };

    const newData = deleteItem(dataItem);
    set_upper_table_data((prev) => ({ ...prev, body: newData }));
  };

  const itemChange = (event) => {
    const inEditID = event.dataItem.upper_ID;
    const field = event.field || "";

    const newData = body.map((item) =>
      item.upper_ID === inEditID
        ? {
            ...item,
            [field]: event.value,
          }
        : item
    );

    set_upper_table_data((prev) => ({ ...prev, body: newData }));
  };

  const close_editng = () => {
    setEditID(null);
  };

  const addRecord = () => {
    const newRecord = {};

    header.forEach((com) => {
      if (com["field_name"] === "upper_ID") {
        newRecord[com["field_name"]] = "create_" + new Date().getMilliseconds();
      } else {
        newRecord[com["field_name"]] = "";
      }
    });

    set_upper_table_data((prev) => ({ ...prev, body: [newRecord, ...body] }));
    setEditID(newRecord.upper_ID);
  };

  return (
    <FixedTableContentsUpperDiv>
      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          sx={{ fontWeight: "bolder", marginBottom: "10px" }}
        >
          Upper Form Table
        </FormLabel>
      </FormControl>

      <Grid
        style={{ maxHeight: height - 23 }}
        data={body.map((item) => ({
          ...item,
          inEdit: item.upper_ID === editID,
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
          return (
            <Column
              field={com.field_name}
              title={com.label_name}
              width="200px"
              key={idx}
              editable={com.field_name !== "upper_ID"}
              editor={handle_editor_data_type(com.data_type)}
              format={"{00:d}"}
            />
          );
        })}
        <Column cell={CommandCell} width="100px" />
      </Grid>
    </FixedTableContentsUpperDiv>
  );
};

export default FixedTableContentsUpper;

const FixedTableContentsUpperDiv = styled.div``;
