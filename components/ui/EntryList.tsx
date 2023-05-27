import { List, Paper } from "@mui/material";
import React, { DragEvent, FC, useContext, useMemo } from "react";
import { EntryCard } from "./EntryCard";
import { EntryStatus } from "@/interfaces/entry";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "@/context/ui";
import styles from './EntryList.module.css'


interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");

    const entry = entries.find(entry => entry._id === id)!;

    entry.status = status
    updateEntry(entry)
    endDragging()
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging: ''}>
      <Paper
        sx={{
          height: "80vh",

          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        <List sx={{ opacity: isDragging? 0.5:1, transition: 'all 0.3s'}}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
