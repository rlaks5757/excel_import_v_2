import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

const DetailDropDownCell = (props) => {
  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value.value,
      });
    }
  };
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? "" : dataItem[field];
  return (
    <td>
      {dataItem.inEdit ? (
        <DropDownList
          style={
            {
              // width: "100px",
            }
          }
          onChange={handleChange}
          value={props.upper_id_list.find((c) => c.value === dataValue)}
          data={props.upper_id_list}
          textField="value"
        />
      ) : (
        dataValue.toString()
      )}
    </td>
  );
};

export default DetailDropDownCell;
