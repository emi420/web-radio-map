import { createSlice } from '@reduxjs/toolkit';

export const createFeature = (lat: number, lon: number) => ({
  "type": "Feature",
  "properties": {},
  "geometry": {
    "coordinates": [lat, lon],
    "type": "Point"
  }
})

const initialState = {
    locations: {
      "type": "FeatureCollection",
      "features": []
  }
}

const LocationsSlice = createSlice({
    name: 'locations',
    initialState: initialState,
    reducers: {
      setLocations(state, action) {
        state.locations = action.payload;
      }
    }
});

export const { setLocations } = LocationsSlice.actions;
export default LocationsSlice;
