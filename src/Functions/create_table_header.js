export const create_table_header = (slice_table, header_point) => {
  const header_point_arr = Array.from(
    { length: header_point },
    (com, idx) => idx
  );

  const max_table_length = Math.max(...slice_table.map((com) => com.length));

  const headers = [];

  for (let i = 0; i < max_table_length; i++) {
    let header = [];

    header_point_arr.forEach((com) =>
      header.push(
        slice_table[com][i] ? slice_table[com][i] : slice_table[com][i - 1]
      )
    );

    headers.push(header.filter((com) => com !== undefined && com !== null));
  }

  const result_header = headers.map((com) => {
    let header_text = "";

    com.forEach((com, idx) => {
      if (idx === 0) {
        header_text += com;
      } else {
        header_text += " " + com;
      }
    });

    return header_text;
  });

  const result_arr = [];

  for (let head of result_header) {
    if (result_arr.includes(head)) {
      result_arr.push(null);
    } else {
      result_arr.push(head);
    }
  }

  return result_arr;
};
