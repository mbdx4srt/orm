const db = require('../src/db');
const Restaurant = require('../src/Restaurant');
const Menu = require('../src/Menu');
const MenuItem = require('../src/MenuItem');

describe('Basic Menu tests', () => {
    beforeAll((done) => {
        db.run("create table restaurant\n" +
            "(\n" +
            "    id    integer primary key autoincrement,\n" +
            "    name  text,\n" +
            "    image  text\n" +
            ");", done);

        db.run("create table menu\n" +
            "(\n" +
            "    id            integer primary key autoincrement,\n" +
            "    title         text,\n" +
            "    restaurant_id INT,\n" +
            "    FOREIGN KEY (restaurant_id) REFERENCES restaurant (id)\n" +
            "\n" +
            ");", done);

        db.run("create table menu_item\n" +
            "(\n" +
            "    id      integer primary key autoincrement,\n" +
            "    name    text,\n" +
            "    price   integer,\n" +
            "    menu_id INT,\n" +
            "    FOREIGN KEY (menu_id) REFERENCES menu (id)\n" +
            ");", done);
    })

    test('can save menu item data', (done) => {
        const restaurant = new Restaurant('Spice Merchant London', 'www.unsplash/jkalsjdka');
        restaurant.save(() => {
            restaurant.get_id(() => {
                db.get('SELECT * FROM Restaurant WHERE name=?', 'Spice Merchant London', (err, row) => {
                    expect(row.image).toEqual('www.unsplash/jkalsjdka');
                    expect(row.id).toEqual(1);
                    const menu = new Menu('Lunch', restaurant)
                    menu.save(() => {
                        db.get('SELECT * FROM Menu WHERE title=? and restaurant_id = ?;',
                            ['Lunch', restaurant.id], (err, row) => {
                                // console.log(row)
                                expect(row.title).toEqual('Lunch');
                                expect(row.restaurant_id).toEqual(restaurant.id);
                                menu.get_id(() => {
                                    const menuItem = new MenuItem('Katsu Curry', 10, menu);
                                    menuItem.save(() => {
                                        db.get('SELECT * FROM menu_item WHERE name ="Katsu Curry"' +
                                            ' and menu_id = ?;',
                                            [menu.id], (err, row) => {
                                                //console.log(err, row)
                                                expect(row.name).toEqual('Katsu Curry');
                                                expect(row.price).toEqual(10);
                                                done()

                                            })
                                    })
                                    })
                                })
                            }
                        )

                    });
                });
            });
        });


    })
