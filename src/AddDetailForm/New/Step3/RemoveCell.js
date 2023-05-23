import React from "react";

const RemoveCell = (props) => {
  const { dataItem } = props;

  return (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() => {
          props.remove(dataItem);
          props.close_editng();
        }}
      >
        Remove
      </button>
    </td>
  );
};

export default RemoveCell;
