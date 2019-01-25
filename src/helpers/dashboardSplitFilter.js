import { find } from "lodash";

class DashboardSplitFilter {
  split = response => {
    console.log(response);
    const blueBlocksName = [
      'Players',
      'Parents',
      'Coaches',
      'Groups',
      'Sessions',
      'Courts'
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
    const returnOrder = [
        {
            name: 'Attendance',
            code: 'attendanceCount',
        },
        {
            name: 'Evals',
            code: 'dailyEvalCount'
        },
        {
            name: 'Fitness Tests',
            code: 'fitnessTestCount'
        },
        {
            name: 'Practice Matches',
            code: 'doublesPMCount',
        },
        {
            name: 'Tournament Matches',
            code: 'tournamentCount',

        },
        {
            name: 'Files',
            code: 'filesCount',
        },
        {
            name: 'Goals',
            code: 'goalsCount'
        },
        {
            name: 'Push Notifications',
            code: 'pushNotificationCount'
        },
        {
            name: 'Player Calendar',
            code: 'playerCalendarCount'
        },
        {
            name: 'Events',
            code: 'eventsCount'
        },
        {
            name: 'Parents',
            code: 'parentCount'
        },
        {
            name: 'Coaches',
            code: 'coachesCount'
        },
        {
            name: 'Groups',
            code: 'groupCount',
        },
        {
            name: 'Sessions',
            code: 'sessionCount'
        },
        {
            name: 'Courts',
            code: 'courtsCount'
        },
        {
            name: 'Singles PM',
            code: 'singlesPMCount'
        }
    ];

    let data = response.data.slice();
    let deletedInd = [];
    let sortedData = [];
    const facilities = returnOrder.map(facility => {
        const temp = response.data.find(item => item.code === facility.code);
        let count = temp.count;
        if (temp.code === 'doublesPMCount') {
            const single = response.data.find(item => item.code === 'singlesPMCount');
            count = temp.count + single.count;
        }
        return {
            ...temp,
            ...facility,
            count
        }
    });
    const itemsNotInList = response.data.filter(item => {
        const idx = returnOrder.findIndex(fac => fac.code === item.code);
        return idx === -1;
    });
   
    response.data = facilities.concat(itemsNotInList);
    return response;
  };
}

const dashboardSplit = new DashboardSplitFilter();
export default dashboardSplit;
