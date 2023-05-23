import React, { useMemo, useState } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import NewUpload from "./New/NewUpload";
import UpdateUpload from "./Update/UpdateUpload";
import DeleteUpload from "./Delete/DeleteUpload";
import useWindowDimensions from "../Hooks/useWindowDimensions";

const AddDetailForm = () => {
  const { height, width } = useWindowDimensions();

  const [selected, setSelected] = useState(0);

  const handleSelect = (e) => {
    setSelected(e.selected);
  };

  const tab_height = useMemo(() => {
    return height - 32 - 45;
  }, [height]);

  const tab_width = useMemo(() => {
    return width - 32 - 10;
  }, [width]);

  return (
    <TabStrip
      selected={selected}
      onSelect={handleSelect}
      style={{ height: height }}
    >
      <TabStripTab title="New">
        <NewUpload height={tab_height} width={tab_width} />
      </TabStripTab>
      <TabStripTab title="Update">
        <UpdateUpload height={tab_height} width={tab_width} />
      </TabStripTab>
      <TabStripTab title="Delete" disabled={true}>
        <DeleteUpload height={tab_height} width={tab_width} />
      </TabStripTab>
    </TabStrip>
  );
};

export default AddDetailForm;
