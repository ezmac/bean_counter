/**
 * ComputerController
 *
 * @description :: Server-side logic for managing computers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /*
     * `ComputerController.free()`
     */
    free: function (req, res) {
        var comp_name = req.param('name');
        Computer.find({name:comp_name}).exec(function(err, computers){
            _.forEach(computers, function(computer){
                computer.updateFree();
                Computer.publishUpdate(computer.id, [computer]);
                console.log("publishedUpdate");
            });
            if (computers.length === 0) {
                return res.json({
                    status: 'fail',
                    error: 'no computer found by that name'
                });
            }

            return res.json({
                status: 'success',
                computers: computers
            });
        });
    },

    /*
     * `ComputerController.ping()`
     */
    ping: function (req, res) {
        var comp_name = req.param('name');
        Computer.find({name:comp_name}).exec(function(err, computers){
            _.forEach(computers, function(computer){
                computer.updateUsed();
                Computer.publishUpdate(computer.id, [computer]);
                console.log("publishedUpdate");
            });
            if (computers.length === 0) {
                return res.json({
                    status: 'fail',
                    error: 'no computer found by that name'
                });
            }

            return res.json({
                status: 'success',
                computers: computers
            });
        });
    },

    /**
     * `ComputerController.index()`
     */
    index: function (req, res) {
        Computer.find({},function(err, computers){
            if(req.isSocket){
                Computer.subscribe(req.socket,computers);
                console.log("It was a websocket!");
            }
            return res.json(
                computers
            );
        });
    },


    /**
     * `ComputerController.show()`
     */
    show: function (req, res) {
        return res.json({
            todo: 'show() is not implemented yet!'
        });
    },

    /**
     * `ComputerController.delete()`
     */
    delete: function (req, res) {
        return res.json({
            todo: 'delete() is not implemented yet!'
        });
    }

    /**
     * `ComputerController.edit()`
edit: function (req, res) {
return res.json({
todo: 'edit() is not implemented yet!'
});
},


     * `ComputerController.delete()`
delete: function (req, res) {
return res.json({
todo: 'delete() is not implemented yet!'
});
}
*/
};

