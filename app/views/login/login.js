var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var dialogsModule = require("ui/dialogs");

//var Observable = require("data/observable").Observable;
var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel({
    email: "",
    password: ""
});


// var user = new Observable({
//     email: "user@domain.com",
//     password: "password"
// });


exports.loaded = function(args) {
    console.info("aplikacia nacitana  --------------------------------------------");
    var page = args.object;
    page.bindingContext = user;
};

exports.signIn = function() {
    console.info("stlacene signIn " + user.email);
    user.login()
        .catch(function(error) {
            console.error(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            frameModule.topmost().navigate("views/list/list");
        });
};


exports.register = function() {
    console.info("stlacene Registering");
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};
