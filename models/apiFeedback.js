var user = require('./userScheme.js');

exports.newFeedback = function(feedbackData, cb) {
  user.findOneAndUpdate(
    { "device.imei" : feedbackData.imei },
    { $push:
      {
        "device.comments":
          {
            contact: feedbackData.contact,
            build_id: feedbackData.build_id,
            comment: feedbackData.comment,
            date_added: new Date()
          }
      }
    },
    function(error, feedback) {
      if (error) {
        cb(error);
        return;
      }
      cb(null, feedback);
    }
  );
};

exports.getAll = function(cb) {
  user.find(
    { },
    {
      _id: false,
      email: true,
      "device.comments": true
    },
    function(error, comments) {
      if (error) {
        cb(error);
        return;
      }
      cb(null, comments);
    }
  );
};