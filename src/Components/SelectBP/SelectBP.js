import React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { bp_list } from "../../UnifierData/UnifierData";
import useWindowDimensions from "../../Hooks/useWindowDimensions";

const SelectBP = ({ setSelectBPToggle, selectBPData, setSelectBPData }) => {
  const { width, height } = useWindowDimensions();

  const createFieldLabel = (arr) => {
    return (
      <div>
        <p>BP Name: {arr.label_name}</p>
        <p>
          Upper Form List:{" "}
          {arr.upper_form.map((com) => com.label_name).join(", ")}
        </p>
        <p>
          Detail Form List:{" "}
          {arr.line_item.map((com) => com.label_name).join(", ")}
        </p>
      </div>
    );
  };

  const handleSelectBPData = (e) => {
    const num_value = Number(e.target.value);
    setSelectBPData(bp_list[num_value]);
  };

  const handleSelectBPDialog = () => {
    if (selectBPData.bp_name !== "") {
      setSelectBPToggle(false);
    } else {
      alert("사용할 BP를 선택하여 주시기 바랍니다.");
    }
  };

  return (
    <div className="selectBP">
      <Dialog>
        <FormControl
          sx={{
            maxWidth: width * 0.7,
            maxHeight: height * 0.8,
            overflow: "auto",
          }}
        >
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{ fontWeight: "bolder" }}
          >
            사용할 BP를 선택하여 주시기 바랍니다.
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // value={upperFormSheet.point}
            name="radio-buttons-group"
            onChange={(e) => {
              handleSelectBPData(e);
            }}
            sx={{ marginTop: "10px" }}
          >
            {bp_list.map((com, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  value={idx}
                  control={<Radio />}
                  label={createFieldLabel(com)}
                  name={String(idx)}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        <DialogActionsBar>
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            onClick={handleSelectBPDialog}
          >
            완료
          </button>
        </DialogActionsBar>
      </Dialog>
    </div>
  );
};

export default SelectBP;
