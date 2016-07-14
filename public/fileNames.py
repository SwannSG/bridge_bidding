import os

def getCardInt(suit, name):
    if name == 't':
        name = 10
    elif name == 'j':
        name = 11
    elif name == 'q':
        name = 12
    elif name == 'k':
        name = 13
    elif name == 'a':
        name = 14
    name = int(name)    

    if suit == 'c':
        return name - 1
    elif suit == 'd':
        return name + 12
    elif suit == 'h':
        return name + 25
    elif suit == 's':
        return name + 38


def transformName(name, suit):
    if name == '10':
        name = 't'
    elif name == 'jack':
        name = 'j'
    elif name == 'queen':
        name = 'q'
    elif name == 'king':
        name = 'k'
    elif name == 'ace':
        name = 'a'
        
    if suit == 'spades':
        suit = 's'
    elif suit == 'hearts':
        suit = 'h'
    elif suit == 'diamonds':
        suit = 'd'
    elif suit == 'clubs':
        suit = 'c'


    intValue = getCardInt(suit, name)
    intValue = str(intValue)
    if len(intValue) == 1:
        intValue = '0' + intValue

    return  name + suit + intValue + '.svg'


# get SVG files in directory
sdir = '/home/swannsg/development/bq/server/images/SVG-cards-1.3/final'
lfiles = os.listdir(sdir)
svgfiles = []
for each in lfiles:
    if each.split('.')[1] == 'svg':
        svgfiles.append(each)
# svgfiles contains all svg files
d = {}
for each in svgfiles:
    name = each.split('.')[0]
    value, temp, suite= name.split('_')
    d[each] = transformName(value, suite)

for each in d:
    print each + ' ' + d[each]

d1 = {}
for each in d:
    intValue = d[each][2:4]
    d1[intValue] = d[each][0:2]

skeys = sorted(d1.keys())
for each in skeys:
    print each + ': ' + "'" + d1[each] + "'" + ',',

print ''

skeys = sorted(d1.values())
for each in skeys:
    for item in d1:
        if d1[item] == each:
            print "'" + each + "'" + ': ' + item + ',',

    
for each in d:
    os.rename(sdir + '/' + each, sdir + '/' + d[each])
    
