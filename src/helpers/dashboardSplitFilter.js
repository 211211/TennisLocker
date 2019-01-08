import { find } from "lodash";

class DashboardSplitFilter {
  split = response => {
    const blueBlocksName = [
      "Player",
      "Parent",
      "Coaches",
      "Group",
      "Session",
      "Courts"
    ];

    response.data.map(item => {
      if (blueBlocksName.indexOf(item.name) !== -1) {
        item.placement = "top";
      } else {
        item.placement = "bottom";
      }
    });
    return response;
  };

  filterAll = response => {
    const schema = [
      "Player",
      "Parent",
      "Coaches",
      "Group",
      "Session",
      "Courts",
      "Attendance",
      "Daily Eval",
      "Fitness Test",
      "Singles PM",
      "Doubles PM",
      "Goals",
      "Events",
      "Tournament",
      "Push Notification",
      "Files",
      "Player Calendar"
    ];

    let data = response.data.slice();
    let deletedInd = [];
    let sortedData = [];

    response.data.map((item, ind) => {
      let ind2 = schema.indexOf(item.name);
      if (ind2 !== -1) {
        sortedData[ind2] = item;
        deletedInd.push(ind);
      }
    });

    data = data.filter((item, i) => {
      return deletedInd.indexOf(i) === -1;
    });

    const newData = sortedData.concat(data);
    const Singles = find(newData, ["name", "Singles PM"]);
    const Doubles = find(newData, ["name", "Doubles PM"]);
    const SinglesIndex = newData.indexOf(Singles);
    newData.splice(SinglesIndex, 1);
    const DoublesIndex = newData.indexOf(Doubles);
    newData[DoublesIndex] = {
      ...Doubles,
      name: "Practice Match",
      count: Doubles.count + Singles.count
    };
    response.data = newData;

    return response;
  };
}

const dashboardSplit = new DashboardSplitFilter();
export default dashboardSplit;
