import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';


Meteor.startup(function() {
    console.log('startup');
    var adjustCardHeight = function() {
        var height = $(window).innerHeight();
        var width = $(window).innerWidth();
        var width_col = $('.left').innerWidth();
        var cardHeight_height = (height - 80)/3.43;
        var cardHeight_width = width_col*0.9;
        if (cardHeight_height < cardHeight_width) {
            console.log('constrained by height');
            setCardHeight(cardHeight_height);
        }
        else {
            console.log('constrained by width');
            setCardHeight(cardHeight_width);
        }
    }

    adjustCardHeight();
    $(window).resize(function(evt) {
        adjustCardHeight();
    });

    // global flag
    nonReactiveGlobals = {};
    globalFlags.create('subColFlag1', ColFlag1, 'sesColFlag1');
    globalFlags.create('subColFlag2', ColFlag2, 'sesColFlag2');

})// end of Meteor.startup

// place these here because this runs before Meteor.startup ??????
Session.set('currentBid', 'none');
Session.set('bidSequence', []);
// toggleTemplateA to force some templates to re-render
Session.set('toggleTemplateA', false);

Session.set('sesColFlag1', 'startup')
Session.set('sesColFlag2', 'startup')

// end

// make block run when a Session variable is changed
// multiple Tracker.autorun() are allowed
Tracker.autorun(function(e) {
    // console.log(e);
    // ge = e;
    var gf1 = Session.get('gf1');
    // var currentBid = Session.get('currentBid');
    console.log("gf1 has changed");

//  doSomething();
});

Tracker.autorun(function(e) {
    ge = e;
    var currentBid = Session.get('currentBid');
    console.log("currentBid has changed");
});



bm.shuffle();

Template.north.helpers({
    north: function() {
        Session.get('toggleTemplateA');
        return bm.north;
    },
});

Template.east.helpers({
    east: function() {
        Session.get('toggleTemplateA');
        return bm.east;
    },
});

Template.south.helpers({
    south: function() {
        Session.get('toggleTemplateA');
        return bm.south;
    },
});

Template.west.helpers({
    west: function() {
        Session.get('toggleTemplateA');
        return bm.west;
    },
});

Template.bidSequence.helpers({
    bidSeq: function() {
        var rows = [{north:'', east:'1c', south:'pass', west:'1s'},
                    {north:'1d', east:'1c', south:'pass', west:'1s'},
                    ];


        return rows;
    }
});

Template.bidButtons.onRendered(function() {
    console.log('bidButtons rendered');
});


Template.bidButtons.helpers({
    allBids: function() {
        console.log('allBids');
        var bids = [
            [{da:'', label:'1&clubs;', value: '1c'},{da:'', label:'<span class="red">1&diams;</span>', value: '1d'},
            {da:'', label:'<span class="red">1&hearts;</span>', value: '1h'},{da:'', label:'1&spades;', value: '1s'},
            {da:'', label:'1NT', value: '1n'}],
            [{da:'', label:'2&clubs;', value: '2c'},{da:'', label:'<span class="red">2&diams;</span>', value: '2d'},
            {da:'', label:'<span class="red">2&hearts;</span>', value: '2h'},{da:'', label:'2&spades;', value: '2s'},
            {da:'', label:'2NT', value: '2n'}],
            [{da:'', label:'3&clubs;', value: '3c'},{da:'', label:'<span class="red">3&diams;</span>', value: '3d'},
            {da:'', label:'<span class="red">3&hearts;</span>', value: '3h'},{da:'', label:'3&spades;', value: '3s'},
            {da:'', label:'3NT', value: '3n'}],
            [{da:'', label:'4&clubs;', value: '4c'},{da:'', label:'<span class="red">4&diams;</span>', value: '4d'},
            {da:'', label:'<span class="red">4&hearts;</span>', value: '4h'},{da:'', label:'4&spades;', value: '4s'},
            {da:'', label:'4NT', value: '4n'}],
            [{da:'', label:'5&clubs;', value: '5c'},{da:'', label:'<span class="red">5&diams;</span>', value: '5d'},
            {da:'', label:'<span class="red">5&hearts;</span>', value: '5h'},{da:'', label:'5&spades;', value: '5s'},
            {da:'', label:'5NT', value: '5n'}],
            [{da:'', label:'6&clubs;', value: '6c'},{da:'', label:'<span class="red">6&diams;</span>', value: '6d'},
            {da:'', label:'<span class="red">6&hearts;</span>', value: '6h'},{da:'', label:'6&spades;', value: '6s'},
            {da:'', label:'6NT', value: '6n'}],
            [{da:'', label:'7&clubs;', value: '7c'},{da:'', label:'<span class="red">7&diams;</span>', value: '7d'},
            {da:'', label:'<span class="red">7&hearts;</span>', value: '7h'},{da:'', label:'7&spades;', value: '7s'},
            {da:'', label:'7NT', value: '7n'}],
        ]
        // must check for pass
        if (Session.get('currentBid')==='ps') {
            // do nothing
            return Session.get('bidButtonState');
        }
        if (Session.get('currentBid')==='none') {
            Session.set('bidButtonState', bids.slice(0,4));
            return bids.slice(0,4);
        }
        console.log(Session.get('currentBid'));
        var bidLevel = parseInt(Session.get('currentBid').slice(0,1))
        var bidSuit = Session.get('currentBid').slice(1,2);

        if (bidSuit === 'n') {
            // no trump, move to next bid level
            bidLevel = bidLevel + 1;
        }
        bidLevel = bidLevel - 1
        var bidLevelMax = bidLevel + 4
        if (bidLevelMax > 7) {
            bidLevelMax = 7;
        }
        if (bidSuit === 'c') {
            bids[bidLevel][0].da = 'disabled';
        }
        if (bidSuit === 'd') {
            bids[bidLevel][0].da = 'disabled';
            bids[bidLevel][1].da = 'disabled';
        }
        if (bidSuit === 'h') {
            bids[bidLevel][0].da = 'disabled';
            bids[bidLevel][1].da = 'disabled';
            bids[bidLevel][2].da = 'disabled';
        }
        if (bidSuit === 's') {
            bids[bidLevel][0].da = 'disabled';
            bids[bidLevel][1].da = 'disabled';
            bids[bidLevel][2].da = 'disabled';
            bids[bidLevel][3].da = 'disabled';
        }
        var bidRspArr = bids.slice(bidLevel,bidLevelMax)
        Session.set('bidButtonState', bidRspArr);
        return bidRspArr;

    }
});

Template.bidButtons.events({
    'click button'(event) {
        var bid = event.currentTarget.value;
        var bidSeq = Session.get('bidSequence');
        console.log('bidSeq: ' + bidSeq);
        bidSeq.push(bid);
        console.log('bidSeq: ' + bidSeq);
        Session.set('bidSequence', bidSeq)
        Session.set('currentBid', bid)
    }
})

Template.body.events({
    'click button#pass'(event) {
        console.log('click button#pass');
        var bidSeq = Session.get('bidSequence')
        console.log('bidSeq: ' + bidSeq)
        bidSeq.push('ps');
        console.log('bidSeq: ' + bidSeq);
        Session.set('bidSequence', bidSeq)
        Session.set('currentBid', 'ps')
    },
    'click button#deal'(event) {
        // save the previous round - to be done
        bm.shuffle();
        Session.set('currentBid', 'none');
        Session.set('bidSequence', [])
        Session.set('toggleTemplateA', !Session.get('toggleTemplateA'));

    }
})
