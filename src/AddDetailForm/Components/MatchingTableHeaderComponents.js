import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { handle_table_data_type } from "../../Functions/public_function";

const MatchingTableHeaderComponents = ({
  selectBPData,
  formType,
  formSheet,
  setFormSheet,
}) => {
  const [upper_form_use_checking, set_upper_form_use_checking] = useState([]);

  useEffect(() => {
    if (selectBPData[formType]) {
      set_upper_form_use_checking(
        selectBPData[formType].map((com) => ({ ...com, using: false }))
      );
    }
  }, [selectBPData, formType]);

  const handleChange = (idx, event) => {
    const { target } = event;
    const { matching_data, body } = formSheet;

    const find_bp_data = selectBPData[formType].find(
      (com) => com.label_name === target.value
    );

    const find_index_matching_data = matching_data.findIndex(
      (com) => com.label_name === target.value
    );

    if (find_index_matching_data >= 0) {
      matching_data[find_index_matching_data] = {
        field_name: "",
        label_name: "",
        data_type: "",
        required: false,
      };
    }

    matching_data.splice(idx, 1, find_bp_data);

    if (
      matching_data.filter((com) => com.label_name !== "").length >=
      upper_form_use_checking.filter((com) => com.required).length
    ) {
      const table_data = body.map((com) => {
        const obj = {};

        com.forEach((com2, idx2) => {
          const { field_name, data_type } = matching_data[idx2];
          if (field_name !== "") {
            obj[field_name] = handle_table_data_type(data_type, com2);
          }
        });

        return obj;
      });

      setFormSheet((prev) => ({ ...prev, table_data }));
    } else {
      setFormSheet((prev) => ({ ...prev, table_data: [] }));
    }

    setFormSheet((prev) => ({ ...prev, matching_data }));
  };

  const clear_matching_header = (idx) => {
    const { matching_data, body } = formSheet;

    matching_data.splice(idx, 1, {
      field_name: "",
      label_name: "",
      data_type: "",
      required: false,
    });

    if (
      matching_data.filter((com) => com.label_name !== "").length >=
      upper_form_use_checking.filter((com) => com.required).length
    ) {
      const table_data = body.map((com) => {
        const obj = {};

        com.forEach((com2, idx2) => {
          const { field_name, data_type } = matching_data[idx2];
          if (field_name !== "") {
            obj[field_name] = handle_table_data_type(data_type, com2);
          }
        });

        return obj;
      });

      setFormSheet((prev) => ({ ...prev, table_data }));
    } else {
      setFormSheet((prev) => ({ ...prev, table_data: [] }));
    }

    setFormSheet((prev) => ({ ...prev, matching_data }));
  };

  return (
    <MatchingTableHeaderDiv>
      <RequiredHeaderListBox>
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{ fontWeight: "bolder", marginBottom: "10px" }}
          >
            아래의 {formType === "upper_form" ? "Upper Form" : "Detail Form"}{" "}
            Table에서 필수 Header(☆)를 확인하여 주시기 바랍니다.
          </FormLabel>
        </FormControl>

        <Stack direction="row" spacing={3}>
          {upper_form_use_checking.length > 0 &&
            upper_form_use_checking.map((com, idx) => {
              const { label_name, required, using } = com;
              return (
                <Chip
                  label={label_name}
                  key={idx}
                  icon={required && <StarOutlineIcon />}
                  variant={using ? "filled" : "outlined"}
                />
              );
            })}
        </Stack>
      </RequiredHeaderListBox>

      <HeaderMappingDiv>
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{ fontWeight: "bolder", marginBottom: "10px" }}
          >
            아래의 Table에서 Header를 Mapping하여 주시기 바랍니다.
          </FormLabel>
        </FormControl>
        <HeaderMappingTable>
          <thead>
            <tr>
              {formSheet.matching_data.map((com, idx) => {
                return (
                  <HeaderMappingTableTh key={idx}>
                    <Select
                      id="demo-simple-select"
                      value={com.label_name}
                      onChange={(e) => handleChange(idx, e)}
                      sx={{ width: "200px", textAlign: "left" }}
                      endAdornment={
                        <IconButton onClick={() => clear_matching_header(idx)}>
                          <ClearIcon />
                        </IconButton>
                      }
                    >
                      {upper_form_use_checking.map((com2, idx) => (
                        <MenuItem value={com2.label_name} key={idx}>
                          {com2.label_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </HeaderMappingTableTh>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {formSheet.body.map((com, idx) => {
              return (
                <tr key={idx}>
                  {com.map((com2, idx2) => {
                    return (
                      <HeaderMappingTableTd key={`${idx}_${idx2}`}>
                        <HeaderMappingTableContents>
                          {com2}
                        </HeaderMappingTableContents>
                      </HeaderMappingTableTd>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </HeaderMappingTable>
      </HeaderMappingDiv>
    </MatchingTableHeaderDiv>
  );
};

export default MatchingTableHeaderComponents;

const MatchingTableHeaderDiv = styled.div`
  height: 100%;
  overflow: auto;
`;

const RequiredHeaderListBox = styled.div`
  margin-bottom: 15px;
`;

const HeaderMappingDiv = styled.div`
  display: block;
`;

const HeaderMappingTable = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
`;

const HeaderMappingTableTd = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  height: 20px;
  width: 200px;
`;

const HeaderMappingTableContents = styled.div`
  font-size: 14px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HeaderMappingTableTh = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  height: 20px;
  width: 200px;
`;
