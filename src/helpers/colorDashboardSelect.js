const SUFFIX_PLURAL_NOUN = 's'
const addSuffixPluralNoun = (str) => `${str}${SUFFIX_PLURAL_NOUN}`

class AddColorButtons {
  colorButtons = response => {
    const arrButtons = [];
    console.log(response.data);
    Object.keys(response.data).forEach(item => {
      const str = item
        .replace(/Count/g, "")
        .replace(/([A-Z]+)/g, " $1")
        .replace(/([A-Z][a-z])/g, "$1");
      const obj = {
        name: addSuffixPluralNoun(str.charAt(0).toUpperCase() + str.slice(1)),
        count: response.data[item],
        activeFlag: false,
        code: item,
        color: "#65b2ff"
      };
      switch (item) {
        case "groupCount":
          arrButtons.push(obj);
          break;
        case "playerCount":
          arrButtons.push(obj);
          break;
        case "parentCount":
          arrButtons.push(obj);
          break;
        case "dailyEvalCount":
          arrButtons.push({
            ...obj,
            color: "#1c65af",
          });
          break;
        case "fitnessTestCount":
          arrButtons.push({
            ...obj,
            color: "#e6d21f"
          });
          break;
        case "singlesPMCount":
          arrButtons.push({
            ...obj,
            color: "#E50404",
          });
          break;
        case "doublesPMCount":
          arrButtons.push({
            ...obj,
            color: "#E50404"
          });
          break;
        case "goalsCount":
          arrButtons.push({
            ...obj,
            color: "#624096",
          });
          break;
        case "eventsCount":
          arrButtons.push({
            ...obj,
            color: "#ea8637",
          });
          break;
        case "attendanceCount":
          arrButtons.push({
            ...obj,
            color: "#8acb3f"
          });
          break;
        case "tournamentCount":
          arrButtons.push({
            ...obj,
            color: "#aed7ff"
          });
          break;
        case "courtsCount":
          arrButtons.push({
            ...obj,
            color: "#65b2ff"
          });
          break;
        case "pushNotificationCount":
          arrButtons.push({
            ...obj,
            color: "#f7ab6f"
          });
          break;
        case "coachesCount":
          arrButtons.push({
            ...obj,
            color: "#65b2ff"
          });
          break;
        case "sessionCount":
          arrButtons.push({
            ...obj,
            color: "#65b2ff"
          });
          break;
        case "filesCount":
          arrButtons.push({
            ...obj,
            color: "#ef35ff"
          });
          break;
        case "playerCalendarCount":
          arrButtons.push({
            ...obj,
            color: "#ff8dbf"
          });
          break;
        default:
          return
      }
    });
    response.data = arrButtons;
    return response;
  };
}

const addColorButtons = new AddColorButtons();
export default addColorButtons;
