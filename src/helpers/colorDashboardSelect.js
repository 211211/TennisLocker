const SUFFIX_PLURAL_NOUN = 's'
const addSuffixPluralNoun = (str) => `${str}${SUFFIX_PLURAL_NOUN}`

class AddColorButtons {
  colorButtons = response => {
    const arrButtons = [];
    Object.keys(response.data).forEach(item => {
      const str = item
        .replace(/Count/g, "")
        .replace(/([A-Z]+)/g, " $1")
        .replace(/([A-Z][a-z])/g, "$1");
      switch (item) {
        case "groupCount":
          arrButtons.push({
            name: addSuffixPluralNoun(str.charAt(0).toUpperCase() + str.slice(1)),
            color: "#65b2ff",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "playerCount":
          arrButtons.push({
            name: addSuffixPluralNoun(str.charAt(0).toUpperCase() + str.slice(1)),
            color: "#65b2ff",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "parentCount":
          arrButtons.push({
            name: addSuffixPluralNoun(str.charAt(0).toUpperCase() + str.slice(1)),
            color: "#65b2ff",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "dailyEvalCount":
          arrButtons.push({
            name: str.charAt(0).toUpperCase() + str.slice(1),
            color: "#1c65af",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "fitnessTestCount":
          arrButtons.push({
            name: addSuffixPluralNoun(str.charAt(0).toUpperCase() + str.slice(1)),
            color: "#e6d21f",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "singlesPMCount":
          arrButtons.push({
            name: str.charAt(0).toUpperCase() + str.slice(1),
            color: "#E50404",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "doublesPMCount":
          arrButtons.push({
            name: str.charAt(0).toUpperCase() + str.slice(1),
            color: "#E50404",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "goalsCount":
          arrButtons.push({
            name: str.charAt(0).toUpperCase() + str.slice(1),
            color: "#624096",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "eventsCount":
          arrButtons.push({
            name: str.charAt(0).toUpperCase() + str.slice(1),
            color: "#ea8637",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "attendanceCount":
          arrButtons.push({
            name: addSuffixPluralNoun(str.charAt(0).toUpperCase() + str.slice(1)),
            color: "#8acb3f",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "tournamentCount":
          arrButtons.push({
            name: addSuffixPluralNoun(str.charAt(0).toUpperCase() + str.slice(1)),
            color: "#aed7ff",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "courtsCount":
          arrButtons.push({
            name: str.charAt(0).toUpperCase() + str.slice(1),
            color: "#65b2ff",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "pushNotificationCount":
          arrButtons.push({
            name: addSuffixPluralNoun(str.charAt(0).toUpperCase() + str.slice(1)),
            color: "#f7ab6f",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "coachesCount":
          arrButtons.push({
            name: str.charAt(0).toUpperCase() + str.slice(1),
            color: "#65b2ff",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "sessionCount":
          arrButtons.push({
            name: addSuffixPluralNoun(str.charAt(0).toUpperCase() + str.slice(1)),
            color: "#65b2ff",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "filesCount":
          arrButtons.push({
            name: str.charAt(0).toUpperCase() + str.slice(1),
            color: "#ef35ff",
            count: response.data[item],
            activeFlag: false
          });
          break;
        case "playerCalendarCount":
          arrButtons.push({
            name: str.charAt(0).toUpperCase() + str.slice(1),
            color: "#ff8dbf",
            count: response.data[item],
            activeFlag: false
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
