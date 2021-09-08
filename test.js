let personOne = {
    name: "Will",
    lastName: "Owen",
};

let personTwo = {
    name: "James",
    lastName: "Owen",
};


function isEquivalent(a, b) {
    // arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If their property lengths are different, they're different objects
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If the values of the property are different, not equal
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If everything matched, correct
    return true;
}


console.log(isEquivalent(personOne, personTwo));