import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';
import '../imports/startup/accounts-config.js';
import Loader from 'angular-ecmascript/module-loader';
import CalendarFilter from './scripts/filters/calendar.filter';

angular.module('tasklist', [
  angularMeteor,
  todosList.name,
  'accounts.ui'
]);

new Loader('tasklist')
  .load(CalendarFilter);
