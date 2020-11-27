class Users {
    constructor(id, name, rfc, address, email) {
        this.id = id;
        this.name = name;
        this.rfc = rfc;
        this.address = address;
        this.email = email;
    }
}

module.exports = {
    Users,
};
