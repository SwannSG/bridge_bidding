import { Meteor } from 'meteor/meteor';



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
});
