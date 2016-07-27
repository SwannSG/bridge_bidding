// Usage: global flags across server and set of clients
// client Session flag change is propogated to Server and other clients
// Server flag changes is propogated to all clients
// Setup ******************************************
// In /lib
//      ColFlag1 = new Mongo.Collection('colflag1');
        // ColFlag1.allow(
        //     {
        //         update: function() {
        //             return true;
        //         },
        //     }
        // )

// Server side
// In Server.startup()
//      ColFlag1.insert({flag:'startup'})
// In Server (not in startup()
//      Meteor.publish('subColFlag1', function() {
//          return ColFlag1.find();
//      })



// In client (not in Client.startup)
//      Session.set('sesColFlag1', 'startup')
// Call the function
//      globalFlags.create(subColFlag1, ColFlag1, sesColFlag1)


// Property names are added to globalFlags, not a ReactiveVar
globalFlags = {}

// name:            subscription name         eg. Meteor.subscribe(name)
// collectionRef:   db global ref             eg. collectionRef = new Mongo.Collection('...')
// sessionRef:      name of Session reference eg. Session.set(sessionRef, ..)

globalFlags.create = function(name, collectionRef, sessionRef) {
    Meteor.subscribe(name, {
        onReady: function() {
            // when subscription is completed this function will run
            globalFlags[name] = collectionRef.findOne()._id;
            Session.set(name, collectionRef.findOne().flag)

            collectionRef.find().observe({
                added: function() {
                },
                changed: function() {
                    // only triggered for a change
                    // if update changes nothing, this is not triggered
                    // Change the Session value
                    Session.set(sessionRef, collectionRef.findOne().flag);
                },
                removed: function() {
                },
            });
        }
    });

    Tracker.autorun(function() {
        // When Session variable changes, db is updated
        console.log(sessionRef + ": has changed");
        // need to update db
        collectionRef.update({_id:globalFlags[name]}, {$set:{flag: Session.get(sessionRef)}})
    });
}
