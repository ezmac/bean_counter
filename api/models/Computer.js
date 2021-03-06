/**
 * Computer.js
 *
 * @description :: Model of a tracked computer
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'localMysqlServer',
    attributes: {

        name: {
            type: "string",
            required: true,
            unique: true

        },
        x: {
            type: "float",
            required: true
        },
        y: {
            type: "float",
            required: true
        },
        timestamp: {
            type: "datetime",
            required: true
        },
        status: {
            type: "string",
            required: true
        },
        room: {
            type: "string",
            required: true
        },
        display: {
            type: "string",
            required: true
        },
        os: {
            type:"string",
//            required:true
        },
        features: {
            type:"json",
            required: false
        },

        updateFree : function() {
            if (sails['computerTimeouts'][this.name] != undefined){
                console.log("Clearing timeout on "+this.display+".")
                clearTimeout(sails['computerTimeouts'][this.name]);
                delete sails['computerTimeouts'][this.name];
            }
            this.status='free';
            this.timestamp = new Date();
            this.save(function(err,computer){
                console.log(err);
                console.log(computer);
            });
            console.log("Computer "+this.display+" marked as free by logoff action");
            return "success";
        },

        updateUsed : function() {
            if (sails['computerTimeouts'][this.name] != undefined){
                console.log("Clearing timeout on "+this.display+".")
                clearTimeout(sails['computerTimeouts'][this.name]);
                delete sails['computerTimeouts'][this.name];
            }
            this.status='used';
            this.timestamp = new Date();
            this.save();
            console.log("Computer "+this.display+" marked as used");
            this.wait();
            return "success";
        },

        wait: function(){
            var self = this;
            var free = function(){
                now = new Date();
                lastUpdate = new Date(self.timestamp);
                if (lastUpdate.getTime()+ sails.config.beancounter.usedTimeout * 60000 < now.getTime()) {
                    self.status="free";
                    self.timestamp = new Date();
                    self.save();
                    console.log("Making "+self.display+" free.");
                }
            }
            console.log("Set timeout for computer " + self.display);
            sails['computerTimeouts'][self.name] = setTimeout(free, sails.config.beancounter.usedTimeout);
        }

    },
    beforeValidate: function(values, cb){
        values.timestamp=new Date();
        console.log(values);
        cb();

  },
  beforeUpdate: function(computer, cb){
    console.log("The before computer is");
    console.log(computer)
    cb();
  },
  afterUpdate: function(computer, cb){
    //there's a possible bug with the return from waterline
    //the json field for features is returned as a string.
      if (typeof computer.features == "string"){
        try{
        computer.features = JSON.parse(computer.features);
        }
        catch(exception){
          computer.features={};
        }
      }
      console.log('===================UPDATED====================');
    cb();


    },

    sweep : function(){
        Computer.find({status: 'used'},function(err, computers){
            for (index in computers){
                computer = computers[index];
                now = new Date();
                lastUpdate = new Date(computer.timestamp);
                if (lastUpdate.getTime()+ Computer.usedTimeout < now.getTime()) {
                    computer.status="free";
                    computer.timestamp = now;
                    computer.save();
                    Computer.publishUpdate(computer.id, [computer]);
                    console.log("making "+computer.display+" free in sweep.");
                }
            };
        });
    },

};

