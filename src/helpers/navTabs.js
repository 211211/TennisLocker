import Dashboard from '../containers/NavSections/Dashboard';
import Users from '../containers/NavSections/Users';
import Players from '../containers/NavSections/Players';
import Coaches from '../containers/NavSections/Coaches';
import Parents from '../containers/NavSections/Parents';
import Groups from '../containers/NavSections/Groups';
import Events from '../containers/NavSections/Events';
import FitnessTest from '../containers/NavSections/FitnessTest';
import PracticeMatches from '../containers/NavSections/PracticeMatches';
import Goals from '../containers/NavSections/Goals';
import Files from '../containers/NavSections/Files';
import PushNotifications from '../containers/NavSections/PushNotifications';
import About from '../containers/NavSections/About';

import dashboard from '../assets/images/icons/dashboard.svg';
import user from '../assets/images/icons/user.svg';
import players from '../assets/images/icons/playear.svg';
import coaches from '../assets/images/icons/coaches.svg';
import groups from '../assets/images/icons/groups.svg';
import events from '../assets/images/icons/events.svg';
import goals from '../assets/images/icons/goal.svg';
import pushNotifications from '../assets/images/icons/notif.svg';
import about from '../assets/images/icons/about.svg';
import files from '../assets/images/icons/folder.svg';
import practiceMatches from '../assets/images/icons/tennis-ball.svg';
import fitnessTest from '../assets/images/icons/tasks.svg';
import parents from '../assets/images/icons/parents.svg';

const navigationTabs = [
    {
        urlName: '/dashboard',
        iconSvg: dashboard,
        name: 'Dashboard',
        comFile: Dashboard
    },
    {
        urlName: '/users',
        iconSvg: user,
        name: 'Users',
        comFile: Users
    },
    {
        urlName: '/players',
        iconSvg: players,
        name: 'Players',
        comFile: Players
    },
    {
        urlName: '/coaches',
        iconSvg: coaches,
        name: 'Coaches',
        comFile: Coaches
    },
    {
        urlName: '/parents',
        iconSvg: parents,
        name: 'Parents',
        comFile: Parents
    },
    {
        urlName: '/groups',
        iconSvg: groups,
        name: 'Groups',
        comFile: Groups
    },
    {
        urlName: '/events',
        iconSvg: events,
        name: 'Events',
        comFile: Events
    },
    {
        urlName: '/fitnessTest',
        iconSvg: fitnessTest,
        name: 'Fitness Test',
        comFile: FitnessTest
    },
    {
        urlName: '/practiceMatches',
        iconSvg: practiceMatches,
        name: 'Practice Matches',
        comFile: PracticeMatches
    },
    {
        urlName: '/goals',
        iconSvg: goals,
        name: 'Goals',
        comFile: Goals
    },
    {
        urlName: '/files',
        iconSvg: files,
        name: 'Files',
        comFile: Files
    },
    {
        urlName: '/pushNotifications',
        iconSvg: pushNotifications,
        name: 'Push Notifications',
        comFile: PushNotifications
    },
    {
        urlName: '/about',
        iconSvg: about,
        name: 'About',
        comFile: About
    }
];
export default { navigationTabs };
