import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
    Meteor
} from 'meteor/meteor';


import {
    Tasks
} from '../../api/tasks.js';

import template from './todosList.html';

class TodosListCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.hideCompleted = true;

        this.helpers({
            tasks() {

                const selector = {};

                // If hide completed is checked, filter tasks
                if (this.getReactively('hideCompleted')) {
                    selector.checked = {
                        $ne: true
                    };
                }
                // Show newest tasks at the top
                return Tasks.find(selector, {
                    sort: {
                        createdAt: -1
                    }
                });
            },
            incompleteCount() {
                return Tasks.find({
                    checked: {
                        $ne: true
                    }
                }).count();
            },
            currentUser() {
                return Meteor.user();
            }

        })
    }
    addTask(newTask, actionBy, actionDate) {
        // Insert a task into the collection
        Meteor.call('tasks.insert', newTask, actionBy, actionDate);

        // Clear form
        this.newTask = '';
        this.actionBy = '';
        this.actionDate = '';
    }

    setChecked(task) {
        // Set the checked property to the opposite of its current value
        Meteor.call('tasks.setChecked', task._id, !task.checked);
        /*Tasks.update(task._id, {
            $set: {
                checked: !task.checked
            },
        });*/
    }

    removeTask(task) {
        Meteor.call('tasks.remove', task._id)
            //Tasks.remove(task._id);
    }
}


export default angular.module('todosList', [
        angularMeteor
    ])
    .component('todosList', {
        templateUrl: 'imports/components/todosList/todosList.html',
        controller: ['$scope', TodosListCtrl]
    });
