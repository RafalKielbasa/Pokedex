import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

function App() {
  return (
    <>
    <div>
          POKEDEX
    </div>
    <div className="buttons">
      <button>
      Ulubione
      </button>
      <button>
      Arena
      </button>
      <button>
      Logowanie
      </button>
      <button>
        Rejestracja
      </button>
      <button>
        Edycja
      </button>
      <button>
        Wyloguj
      </button>
    </div>
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
    </>
  );
}

export default App;
