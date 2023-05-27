import { useRouter } from "next/router";
import { UIContext } from "@/context/ui";
import { Entry } from "@/interfaces";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { FC, useContext } from "react";
import { dateFunctions  } from "@/utils";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

  const { endDragging, startDragging} = useContext(UIContext)
  const router =  useRouter()

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", entry._id);

    startDragging()
  };

  const onDragEnd = () => { endDragging() };

  const onClick = () => {
    router.push(`/entries/${ entry._id}`)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">{  dateFunctions.getformatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
