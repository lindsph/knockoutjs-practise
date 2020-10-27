function CreateAccountViewModel() {
    var self = this;

    self.firstName = ko.observable("").extend({
        // short version
        required: true,
        minLength: 2,

        // longer version
        // validation: {
        //    message: "Please enter at least 2 characters",
        //    validator: function(value) {
        //       return value.length >= 2;
        //    }
        // }
    });

    self.emailAddress = ko.observable("").extend({
        required: true,
        //email: true doesn't catch if there's no value, just if the value is incorrect
        email: true
    });

    self.subscriptionType = ko.observable("standard");
    self.hasBeenSubmitted = ko.observable(false);

    // methods included for manipulating arrays, and tracks changes more efficiently
    self.usersArray = ko.observableArray([
        {
            firstName: "Lindsay",
            emailAddress: "test@test.com",
            subscriptionType: "standard" 
        }
    ]);

    //happens whenever the observable changes
    self.usersArray.subscribe(function (newValue) {
        console.log(newValue);
	});

    self.addUser = function(userObject) {
        self.usersArray.push(userObject)
    };

    self.removeUser = function(data, event) {
        // data will be the object of the user
        
        var userIndexToRemove = event.target.getAttribute("item-index");
        self.usersArray.splice(userIndexToRemove, 1);

        return self.usersArray;
    }

    self.handleSubmit = function () {
        // knockoutjs takes care of the event.preventDefault()

        // check for anything in the view model that has validations in it, will come back as an array of errors
        // **Note:** will not show the errors for the specific fields unless the field itself has been interacted with with the errors.showAllMessages();     
        var errors = ko.validation.group(self);
        if (errors().length > 0) {
            errors.showAllMessages();
            return;
        }

        self.hasBeenSubmitted(true);

        // valid form submission
        console.log('form submitted!')

        // setup API call here, or database persistence

        var payload = {
            firstName: self.firstName(),
            emailAddress: self.emailAddress(),
            subscriptionType: self.subscriptionType(),
        }

        self.addUser(payload);
    }

};

const knockoutApp = document.querySelector("#knockout-app");
//how you get knockout wired up on the page (usually only call once)
ko.applyBindings(new CreateAccountViewModel(), knockoutApp);