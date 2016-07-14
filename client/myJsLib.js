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
    _cmp: function(a,b) {
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
}

getCardHeight = function() {
    var styles = getComputedStyle(document.documentElement);
    return String(styles.getPropertyValue('--cardheight')).trim();

}

setCardHeight = function(height) {
    document.documentElement.style.setProperty('--cardheight', height + 'px');
}
