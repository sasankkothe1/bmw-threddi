import LocationDispatcher from '../dispatchers/locations.dispatcher'
import LocationService from "../services/locations.service";

class LocationActions {


    getLocation() {
        LocationService.getMainLocations()
            .then((locations) => {
                LocationDispatcher.dispatch({
                    actionType: 'GET_LOCATIONS',
                    value: locations
                });
            })
            .catch((error)=>{
                LocationDispatcher.dispatch({
                    actionType: 'GET_LOCATIONS_ERROR',
                    value: error
                });
            }
        )
    }

    createLocation(data) {
        LocationService.createMainLocations(data)
            .then((locations) => {
                LocationDispatcher.dispatch({
                    actionType: 'POST_LOCATION_SUCCESSFUL',
                    value: locations
                });
            })
            .catch((error)=>{
                    console.dir(error.response.data);
                    LocationDispatcher.dispatch({
                        actionType: 'POST_LOCATION_ERROR',
                        value: error.response.data
                    });
                }
            );
    }
    deleteLocation(data) {
        LocationService.deleteMainLocations(data)
            .then((locations) => {
                LocationDispatcher.dispatch({
                    actionType: 'DELETE_LOCATION_SUCCESSFUL',
                    value: locations
                });
            })
            .catch((error)=>{
                    LocationDispatcher.dispatch({
                        actionType: 'DELETE_LOCATION_ERROR',
                        value: error
                    });
                }
            );
    }

}

export default new LocationActions()