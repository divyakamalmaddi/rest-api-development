var Diary = require('../models/Diary');

var User = require('../models/User');

exports.createDiaryEntry = function(req, res) {
    User.findByToken({
        "token" : req.body.token
    }, function(err,user){
        if(err||user==null) {
			res.status(200).send({
				"status": false,
				"error": "Invalid authentication token."
			  });
		} else {
            var newDiaryEntry = new Diary({
                "author": user.username,
                "title": req.body.title,
                "public": req.body.public,
                "text": req.body.text
            });
            newDiaryEntry.save(function(err,entry) {
                if(err) {
                    console.log(err);
                    res.status(200).send({
                        "status": false,
                        "error": "Invalid authentication token."
                    });
                } else {
                    console.log("Successfully created a Diary entry.");
                    res.status(201).send({
                            status: true,
                            result: entry.id
                    });
                }
            });
        }
    });
}
exports.deleteEntry = function(req, res) {
    User.findByToken({
        "token" : req.body.token
    }, function(err,user){
        if(err||user==null) {
			res.status(200).send({
				"status": false,
				"error": "Invalid authentication token."
			  });
		} else {
            Diary.findOne({
                "author": user.username,
                "id": req.body.id
            }).exec(function(err,entry) {
                if(err||user==null) {
                    res.status(200).send({
                        "status": false,
                        "error": "No such entry"
                      });
                } else {
                    entry.remove(function(err){
                        if(err) {
                            console.log(err);
                            res.status(200).send({
                                "status": false,
                                "error": "Invalid authentication token."
                            });
                        } else {
                            console.log("Successfully deleted a Diary entry.");
                            res.status(200).send({
                                status: true
                            });
                        }
                    });
                }
            });
        }
    });
}
exports.editPermission = function(req, res) {
    User.findByToken({
        "token" : req.body.token
    }, function(err,user){
        if(err||user==null) {
			res.status(200).send({
				"status": false,
				"error": "Invalid authentication token."
			  });
		} else {
            Diary.findOne({
                "author": user.username,
                "id": req.body.id
            }).exec(function(err,entry) {
                if(err||entry==null) {
                    res.status(200).send({
                        "status": false,
                        "error": "No such entry"
                      });
                } else {
                    entry.update({
                        "public" : req.body.public
                    },function(err){
                        if(err) {
                            console.log(err);
                            res.status(200).send({
                                "status": false,
                                "error": "Invalid authentication token."
                            });
                        } else {
                            console.log("Successfully changed permission of a Diary entry.");
                            res.status(200).send({
                                status: true
                            });
                        }
                    });
                }
            });
        }
    });
}
exports.getAllPublicDiaries = function(req, res) {
    Diary.getAllPublicDiaries(function(err, entries){
        if(err) {
            console.log(err);
            res.status(200).send({
                status: true,
                result: [],
              });
        }else {
            res.status(200).send({
                status: true,
                result: entries,
              });
        }
    });
}
exports.getEntriesByUsername = function(req, res) {
    User.findByToken({
        "token" : req.body.token
    }, function(err,user){
        if(err||user==null) {
			res.status(200).send({
				"status": false,
				"error": "Invalid authentication token."
			  });
		} else {
            Diary.getAllEntriesByAuthor(user.username,function(err, entries){
                if(err) {
                    console.log(err);
                    res.status(200).send({
                        status: false,
                        "error": "Invalid authentication token."
                      });
                }else {
                    res.status(200).send({
                        status: true,
                        result: entries,
                    });
                }
            });
        }
    });
}