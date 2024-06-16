import type { Place } from "../api/Place";
import { Fragment, useEffect, useRef, useState } from "react";
import { search } from "../api/search";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { CircularProgress } from "@mui/material";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
  onError: (e: string) => void;
}

const LocationSearch = ({ onPlaceClick, onError }: LocationSearchProps) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState("");
  const [isSuggestionsHide, setIsSuggestionsHide] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (term !== "") {
      try {
        setIsLoading(true);
        const result = await search(term);
        setPlaces(result);
        setIsLoading(false);
      } catch (error) {
        onError(`${error}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClear = () => {
    setTerm("");
    setPlaces([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePlaceClick = (place: Place) => {
    inputRef.current?.blur();
    onPlaceClick(place);
    setIsSuggestionsHide(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-400 px-4 py-2 w-full"
            id="term"
            ref={inputRef}
            value={term}
            onClick={() => setIsSuggestionsHide(false)}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search Location"
          />

          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <CircularProgress size={20} />
            </div>
          )}

          {term !== "" &&
            document.activeElement === inputRef.current &&
            !isLoading && (
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 hover:text-gray-700"
              >
                <RiSearchLine />
              </button>
            )}

          {term !== "" &&
            places.length > 0 &&
            document.activeElement !== inputRef.current &&
            !isLoading && (
              <button
                type="button"
                onClick={() => handleClear()}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 hover:text-gray-700"
              >
                <RiCloseLine />
              </button>
            )}
        </div>
      </form>
      {!isSuggestionsHide && places.length > 0 && (
        <>
          <h1 className="font-bold mt-6">Found Location</h1>
          <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
            {places.map((place) => {
              return (
                <Fragment key={place.id}>
                  <p className="text-sm">{place.name}</p>
                  <button
                    className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded"
                    onClick={() => handlePlaceClick(place)}
                  >
                    Go
                  </button>
                  <div className="border-b w-full col-span-2" />
                </Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default LocationSearch;
