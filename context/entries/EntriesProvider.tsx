import { FC, useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "@/interfaces";
// import { v4 as uuidv4} from 'uuid'
import { entriesApi } from "@/apis";
import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [  ],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const {enqueueSnackbar} = useSnackbar()

  const addNewEntry = async( description: string ) => {

    const { data } = await entriesApi.post<Entry>('/entries', {description});
    dispatch({type:"[Entry] Add-Entry", payload: data})

  }

  const updateEntry = async( entry: Entry, showSnackbar=false) => {

    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, { description: entry.description, status: entry.status});
      dispatch({ type:"[Entry] Entry-Updated", payload: data})

      if (showSnackbar){
        enqueueSnackbar('entry-updated', { 
          variant:'success',
          autoHideDuration: 1500,
          anchorOrigin:{
            vertical:'top',
            horizontal:'right'
          }
  
        })
      }
    } catch (error) {
      console.log({ error})
    }
  }

  const deleteEntry = async ( entry: Entry, showSnackbar = false ) => {
    try {
        const  {data} = await entriesApi.delete<Entry>(`/entries/${ entry._id }` )

        dispatch({
            type: "[Entry] Entry-Delete",
            payload: data
        })

        if( showSnackbar ) {
            enqueueSnackbar('Entrada borrada correctamente',{
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            })
        }

        

    } catch (error) {
        console.log({ error });
    }
}

  const refreshEntries = async() => {
      const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({type: "[Entry] Refresh-Data", payload: data})
  }


  useEffect(() => {
    refreshEntries();
  }, [])
  


  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods

        addNewEntry,
        updateEntry,
        deleteEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
