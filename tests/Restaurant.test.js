const db = require('../src/db');
const Restaurant = require('../src/Restaurant');

describe('Basic restaurant tests', () => {
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

    test('can save restaurant data', (done) => {
        const restaurant = new Restaurant('Spice Merchant Bath', 'www.unsplash/jkalsjdka');
        restaurant.save(() => {
            db.get('SELECT * FROM Restaurant WHERE name=?', 'Spice Merchant Bath', (err, row) => {
                expect(row.image).toEqual('www.unsplash/jkalsjdka');
                expect(row.id).toEqual(1);
                done();
            });
        });
    });

    test('can get restaurant data', (done) => {
        const restaurant = new Restaurant('Spice Merchant Bristol', 'www.unsplash/jkalsjdka');
        restaurant.save(() => {
            restaurant.get_id(() => {
         //       console.log(restaurant.id, restaurant.name)
                expect (restaurant.id).toEqual(2)
                expect (restaurant.name).toEqual('Spice Merchant Bristol')
                done();
            })
        });

    });
    test('Create from ID', (done) => {
        Restaurant.create_from_id(2,(restaurant)=> {
        //        console.log(restaurant.id, restaurant.name)
                expect (restaurant.id).toEqual(2)
                expect (restaurant.name).toEqual('Spice Merchant Bristol')
                done();
            })
        });


})
