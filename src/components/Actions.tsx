import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useState } from "react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}
const Actions = ({ onDelete, onEdit }: Props) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div className="flex flex-row justify-center">
      <IconButton
        aria-label="edit"
        size="small"
        onClick={onEdit}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <EditIcon
          style={{ color: hovered ? "#DAC345" : "#696969" }}
          fontSize="small"
        />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={onDelete}
        onMouseEnter={handleMouseEnter}
      >
        <ClearIcon
          onMouseLeave={handleMouseLeave}
          style={{ color: hovered ? "#F90000" : "#696969" }}
          fontSize="small"
        />
      </IconButton>
    </div>
  );
};

export default Actions;
