const db = require('./db');

class Restaurant {
    constructor(name, image, id) {
        this.name = name;
        this.image = image;
        this.id = id;
    }

    static create_from_id(id, cb) {
        db.get("SELECT name,image,id FROM Restaurant where id = ?", id, (err, row) => {
            const restaurant = new Restaurant(row.name, row.image, row.id)
            cb(restaurant)
        })
    }

    save(cb) {
        db.run("INSERT INTO Restaurant(name, image) VALUES(?, ?)", [this.name, this.image], cb);

    }

    get_id(cb) {
        db.get("SELECT id FROM Restaurant where name = ?", [this.name], (err, row) => {
            this.id = row.id;
            cb()
        })
    };
}

module.exports = Restaurant;