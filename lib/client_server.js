// things in lib run first

// global flag (gf)
Gf1 = new Mongo.Collection('gf1');

Gf1.allow(
    {
        update: function() {
            return true;
        },
    }
)


ColFlag1 = new Mongo.Collection('colflag1');
ColFlag1.allow(
    {
        update: function() {
            return true;
        },
    }
)

ColFlag2 = new Mongo.Collection('colflag2');
ColFlag2.allow(
    {
        update: function() {
            return true;
        },
    }
)
