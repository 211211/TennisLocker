import { GET_FACILITY_ALL } from "../../constants/ActionTypes";
import api from "../../helpers/api/AxiosHelper";
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
  };
}
