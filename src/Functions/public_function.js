import axios from "axios";

const { REACT_APP_URI } = process.env;

export const upload_request = async (project_name, bp_name, data) => {
  const request_upload = await axios.post(`${REACT_APP_URI}/api/uploadData`, {
    project_name,
    bp_name,
    data,
  });

  return request_upload.data;
};

export const handle_editor_data_type = (type) => {
  switch (type) {
    case "String":
      return "text";

    case "Number":
      return "numeric";

    case "Date":
      return "date";

    default:
      return "text";
  }
};

export const handle_table_data_type = (type, data) => {
  switch (type) {
    case "String":
      return data ? data.toString() : "";
    case "Number":
      return Number(data);
    case "Date":
      return new Date(data);
    default:
      return data.toString();
  }
};
