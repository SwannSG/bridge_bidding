#Client Server Interaction#

##Invoke Dealing##

*Dealing* can be invoked from a client or the server.

*Dealing* can have associated *dealCriteria* that select a specific deal. This may be processor intensive.

*Dealing* runs on the client(s) and not the server. The idea is that deal processing is distributed across the clients. That way we keep the load off the server.

##Invoke Dealing From The Server##

Server will send message *findRightDeal(dealCriteria)* to participating clients.

Participating clients are associated with a unique *clientsID*. So *clientsID* containse the set of clientIDs, [clientID_1, clientID_2, ..., clientID_n].

Once the Server sends the message, the server's state changes to *waitingForRightDeal*.

We assume the *findRightDeal* messages arrive at each of the clients.

##Invoke Dealing From A Client##
