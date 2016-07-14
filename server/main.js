import { Meteor } from 'meteor/meteor';

<<<<<<< HEAD


Meteor.startup(() => {
  // code to run on server at startup
      ColFlag1.insert({flag:'startup'});
      ColFlag2.insert({flag:'startup'});
});

Meteor.publish('subColFlag1', function() {
    return ColFlag1.find();
});


Meteor.publish('subColFlag2', function() {
    return ColFlag2.find();
=======
Meteor.startup(() => {
  // code to run on server at startup
>>>>>>> 9d9248f87212f3f7e4316ea9fbff2ee70b89ab36
});
