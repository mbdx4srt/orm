const db = require('./db');

class MenuItem {
    constructor(name, price, menu,id) {
        this.name = name;
        this.price = price;
        this.menu=menu
        this.id=id
    }

    save(cb) {
        db.run("INSERT INTO menu_item (name, price, menu_id) VALUES(?, ?,?)",
            [this.name, this.price, this.menu.id], cb);
    }
}

module.exports = MenuItem;