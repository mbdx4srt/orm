const db = require('./db');

class Menu {
    constructor(title, restaurant,id) {
        this.title = title;
        this.restaurant = restaurant;
        this.id=id
    }

    save(cb) {
        db.run("INSERT INTO Menu (title, restaurant_id) VALUES(?, ?)",
            [this.title, this.restaurant.id], cb);
    }
    get_id(cb) {
        //console.log(this)
        db.get("SELECT id FROM Menu where title = ? and restaurant_id = ?;",
            [this.title, this.restaurant.id], (err, row) => {
            //console.log(err)
            //console.log('row'+row)
            this.id = row.id;
            cb()
        })
    };
}

module.exports = Menu;