import { GET_FACILITY_ALL } from "../../constants/ActionTypes";
import api from "../../api/index";
import AuthHelper from "../../helpers/AuthHelper";
import config from "../../config";

export function getFacilityAll() {
  return dispatch => {
    return api
      .get(`${config.baseUrl}/facility/all`)
      .then(AuthHelper.checkStatus)
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
