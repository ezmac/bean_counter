# Computer availability script 
###### Better project pending

A computer usage tracker written for Node.js using [Sails](http://sailsjs.org)

Program was written for MSU Libraries.  They reserve all rights, ownership, etc.  Consider it Creative Commons Attribution-NonCommercial-ShareAlike until otherwise noted.


## About

Bean counter is designed to track the in use and free computers in several computer labs and display them on a map.  It was inspired by [code4lib](journal.code4lib.org/articles/4067), but tries to address a few problems with the original imlpementation in relation to network outages and power failure.

### Status

Consider it alpha.  It's usable and probably flexible enough to use for your lab in less than a day.  I have not spent more than 5 minutes on security or load testing.

## Architecture

Bean Counter has a backend server (node.js), a MySQL database to back it, and a client written in python.  Display is done through javascript using the server's json data. I put angular on it for fun, but it's not cleaned or separated.

### Client

The client will run on login and end on logout.  While running, it will ping the backend on an interval to be marked as in use.  On exit, it will send an unused message to the backend.

Python was used because it is cross platform and can be compiled.

### Server

The server is a simple restful json API. The computers has ping and free endpoints which are used by the clients to update status.  A get to '/computer' will receive a json array of computer objects in the form of

```json
    [{
        "name": string,
        "x": integer,
        "y": integer,
        "timestamp": UTC Timestamp,
        "status": "free" or "used",
        "room": string,
        "display": string,
        "description": string,
        "id": integer,
        "createdAt": UTC Timestamp,
        "updatedAt": UTC Timestamp
    }]
```

When a computer pings, it is marked as used and a timeout is set.  When the timeout expires, the computer is marked free.  If there is a timeout already set when a computer pings, it will be cleared before setting the next timeout.


## Features
 - Auto expiring usage state (mostly network/power outage tolerant)
 - Stupidly fast updates where supported (using websockets)
 - support for multiple labs
 - flexible because it offloads display to something else.
 - sweeps up unused computers on an interval
 - has example angular frontend in wrong location


## Todo

 - move the angular frontend somewhere and clean it up
 - make non ws clients update on interval
 - secure pings and frees from client (somehow)
 - add some computer/lab management


## Author

Tad Merchant <tadmerchant@library.msstate.edu>
