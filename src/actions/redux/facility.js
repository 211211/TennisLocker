import { GET_FACILITY_ALL } from "../../constants/ActionTypes";
import api from "../../api/index";
import helpers from "../../helpers/index";
import config from "../../config";

export function getFacilityAll() {
  return dispatch => {
    return api
      .get(`${config.baseUrl}/facility/all`)
      .then(helpers.checkStatus)
      .then(response =>
        dispatch({
          type: GET_FACILITY_ALL,
          facilityArr: response.data
        })
      )
      .catch(error => {
        console.log("error getFacilityAll", error);
      });
  };
}
