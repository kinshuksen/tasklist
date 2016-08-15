import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });
}


Meteor.methods({
  'tasks.insert' (text, actionBy, actionDate) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      actionBy,
      actionDate,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'tasks.remove' (taskId) {
    check(taskId, String);
    if (!Meteor.userId()) {
      throw new Errors.throw('not-authorized');
    }
    Tasks.remove(taskId);
  },
  'tasks.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    } else{

    Tasks.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  }
  },
});
