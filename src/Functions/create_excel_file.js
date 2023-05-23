import * as XLSX from "xlsx";

export const create_xlsx_file = (upper, detail) => {
  const workbook = XLSX.utils.book_new();
  const worksheet_1 = XLSX.utils.json_to_sheet(upper);
  const worksheet_2 = XLSX.utils.json_to_sheet(detail);

  XLSX.utils.book_append_sheet(workbook, worksheet_1, "upper");
  XLSX.utils.book_append_sheet(workbook, worksheet_2, "detail");

  XLSX.writeFile(workbook, "test.xlsx");
};
