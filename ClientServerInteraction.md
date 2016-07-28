#Client Server Interaction#

##Invoke Dealing##

*Dealing* can be invoked from a client or the server.

*Dealing* can have associated *dealCriteria* that select a specific deal. This may be processor intensive.

*Dealing* runs on the client(s) and not the server. The idea is that deal processing is distributed across the clients. That way we keep the load off the server.

##Servers state##

Participating clients are associated with a unique *clientsID*. So *clientsID* contains the set of clientIDs, [clientID_1, clientID_2, ..., clientID_n].

The Server maintains state for each clientsID.

The initial state is *clientsID.state* set *'Idle'*.


##Invoke Dealing From The Server##

Server will send message *findRightDeal(dealCriteria)* to participating clients.

Once the Server sends the message, the server's state changes to *waitingForRightDeal* for that *clientsID*. *clientsID.state* set *'waitingForRightDeal'*.

We assume the *findRightDeal* messages arrive at each of the clients.

##Invoke Dealing From A Client##

The Client will send a *findRightDeal(dealCriteria)* to Server.

The Client will immediately start looking for the right deal.

When the Server receives the message, the server's state changes to *waitingForRightDeal* for that *clientsID*. *clientsID.state* set *'waitingForRightDeal'*.

The Server will send message *findRightDeal(dealCriteria)* to participating clients excluding the Client that originated the message.

##Client finds right deal##

When a Client finds the right deal, it needs to notify the Server that a solution has been found.

The Client sends a *rightDealFound(deal)* to the Server.

The Server accepts the message, provided *clientsID.state* set *waitingForRightDeal* and changes state to 'Idle'.

In addition Server sends a *rightDealFound(deal)* message to participating clients excluding the Client that originated the *rightDealFound(deal)* message.

##Summary##

If the Server state t0 is NOT in the designated state, then any action of message is ignored.

| Client Send                 | Server State t0     | Server State t1     | Server Send                 | Server Action  |
| --------------------------- | ------------------- | ------------------- | --------------------------- | -------------- |                             |                             | idle                | waitingForRightDeal | findRightDeal(dealCriteria) | Invoke dealing |
| findRightDeal(dealCriteria) | idle                | waitingForRightDeal |                             |                |
| rightDealFound(deal)        | waitingForRightDeal | idle                | rightDealFound(deal)        |                |


end
