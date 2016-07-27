// things in lib run first
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
