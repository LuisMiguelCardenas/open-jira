import { Box, Button, TextField } from "@mui/material";
import React, { ChangeEvent, useContext, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui/UIContext";

export const NewEntry = () => {
  
  const { addNewEntry  } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry  } = useContext(UIContext);


  const [inputValue, setInputValue] = useState('');

  const [touched, setTouched] = useState(false)


  const onTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }


  const onSave = () => {
    if ( inputValue.length === 0 ) return 
      addNewEntry(inputValue);
      setIsAddingEntry(false)
      setTouched(false)
      setInputValue('')
}
  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New entry"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText="Ingrese un valor"
            error = { inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={ onTextChange }
            onBlur={ () => setTouched(true) }
          />

          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={() => setIsAddingEntry(false)}>Cancelar</Button>

            <Button variant="outlined" onClick={onSave} color="secondary" endIcon={<SaveIcon />}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button startIcon={<DataSaverOnIcon />} fullWidth variant="outlined" onClick={() => setIsAddingEntry(true)}>
          {" "}
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
