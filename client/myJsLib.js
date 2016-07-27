// bm name will need to be changed
// bm is a global variable on the client
bm = {
    name:'bm',
    version: '1.0',
     pack: ['2c01', '3c02', '4c03', '5c04', '6c05', '7c06', '8c07', '9c08', 'tc09',
      'jc10', 'qc11', 'kc12', 'ac13', '2d14', '3d15', '4d16', '5d17', '6d18',
      '7d19', '8d20', '9d21', 'td22', 'jd23', 'qd24', 'kd25', 'ad26', '2h27',
      '3h28', '4h29', '5h30', '6h31', '7h32', '8h33', '9h34', 'th35', 'jh36',
      'qh37', 'kh38', 'ah39', '2s40', '3s41', '4s42', '5s43', '6s44', '7s45',
      '8s46', '9s47', 'ts48', 'js49', 'qs50', 'ks51', 'as52',],
    north: [],
    south: [],
    east: [],
    west: [],
    shuffle: function() {
        var shuffled_pack = _.shuffle(this.pack);
        this.north = shuffled_pack.slice(0,13).sort(this._cmp.bind(this));
        this.east = shuffled_pack.slice(13,26).sort(this._cmp.bind(this));
        this.south = shuffled_pack.slice(26,39).sort(this._cmp.bind(this));
        this.west = shuffled_pack.slice(39,52).sort(this._cmp.bind(this));
    },
    _cmp: function _cmp(a,b) {                   // display order of cards on screen
        var aInt = parseInt(a.slice(2,4));
        var bInt = parseInt(b.slice(2,4));
        var aSuit = a.slice(1,2);
        var bSuit = b.slice(1,2);
        if (aSuit === 'c' && bSuit === 'd') {
            {return -1;}
        }
        if (aSuit === 'd' && bSuit === 'c') {
            {return 1;}
        }
        if (aInt > bInt) {return -1;}
        if (aInt < bInt) {return +1;}
    },
    rightDeal: function _rightDeal(dealSelector) {
        // dealSelector
        // {}                                   any deal
        // {points: x, distr:[nc, nd, nh, ns]}  combined
        self = this;
        var dealSelector;
        dealSelector = dealSelector || {};  //parameter may be omitted
        console.log(dealSelector);
        if (Object.keys(dealSelector).length === 0) {
            // empty dealSelector --> any deal
            console.log('1');
            return true;
        }
        if (dealSelector.hasOwnProperty('points') && dealSelector.hasOwnProperty('distr')) {
            // points and distr selection criteria
            console.log('3');
            return;
        }
        if (dealSelector.hasOwnProperty('points')) {
            // points selection criteria
            console.log('2');
            self._points(self);         // assign points to each hand
            self._pointsCombo(self, dealSelector.points)
            return;
        }
        if (dealSelector.hasOwnProperty('distr')) {
            // distr selection criteria
            console.log('4');
            return;
        }
        console.log('5');
    },
    _pointsCombo: function _pointsCombo(self, points) {
        // NS
        if (self.north.points + self.south.points === points) {
            return true;
        }
        // NE
        if (self.north.points + self.east.points === points) {
            var temp = self.east.points;
            self.east.points = self.south.points;
            self.south.points = temp;
            return true;
        }
        // NW
        if (self.north.points + self.west.points === points) {
            var temp = self.west.points;
            self.west.points = self.south.points;
            self.south.points = temp;
            return true;
        }
        // ES
        if (self.east.points + self.south.points === points) {
            var temp = self.east.points;
            self.east.points = self.north.points;
            self.north.points = temp;
            return true;
        }
        // EW
        if (self.east.points + self.west.points === points) {
            return true;
        }
        // SW
        if (self.south.points + self.west.points === points) {
            return true;
        }
        return false;
    },
    _points: function _points(self) {
        // compute total points
        self.north.points = self._getPoints(self, self.north);
        self.east.points = self._getPoints(self, self.east);
        self.south.points = self._getPoints(self, self.south);
        self.west.points = self._getPoints(self, self.west);
    },
    _getPoints: function _getPoints(self, hand) {
        // x hand array
        return hand.reduce(function(points, x) {
            x = x.charAt(0);
            console.log(x);
            if (x==='j') {
                // jack
                return points+=1;
            }
            else if (x ==='q') {
                // queen
                return points+=2;
            }
            else if (x ==='k') {
                // king
                return points+=3;
            }
            else if (x ==='a') {
                // ace
                return points+=4;
            }
            else {
                return points;
            }
        },0);
    }
}

getCardHeight = function() {
    var styles = getComputedStyle(document.documentElement);
    return String(styles.getPropertyValue('--cardheight')).trim();

}

setCardHeight = function(height) {
    document.documentElement.style.setProperty('--cardheight', height + 'px');
}
