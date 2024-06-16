import { useState } from "react";
import type { Place } from "./api/Place";
import LocationSearch from "./components/LocationSearch";
import Map from "./components/Map";
import { Snackbar, Alert } from "@mui/material";
function App() {
  const [place, setPlace] = useState<Place | null>(null);
  const [error, setApiError] = useState<string | null>(null);

  const handleCloseSnackbar = () => {
    setApiError(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <div className="z-10 p-2 bg-white shadow-md">
        <LocationSearch
          onPlaceClick={(p) => setPlace(p)}
          onError={(e) => setApiError(e)}
        />
      </div>
      <div className="flex-grow relative">
        <Map place={place} />
      </div>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
