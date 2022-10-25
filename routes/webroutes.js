function initRoutes(app, db) {


    // get app restaurants 
    app.get("/api/v1/restaurants", async (req, res) => {
        try {
            const results = await db.query("SELECT * FROM restaurants")
            res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: {
                    restaurants: results.rows
                },
            })
        } catch (error) {
            // res.send(error)
            console.log(error)
        }
    })


    // get single restaurant
    app.get("/api/v1/restaurants/:id", async (req, res) => {
        try {
            const results = await db.query("SELECT * FROM restaurants where r_id = $1", [req.params.id])
            res.status(200).json({
                status: "success",
                data: {
                    restaurant: results.rows
                },
            })
        } catch (error) {
            console.log(error)
        }
    })


    // create a restaurant
    app.post("/api/v1/restaurants", async (req, res) => {
        try {
            const results = await db.query("INSERT INTO restaurants (r_name , r_loc, r_rating) VALUES ($1, $2, 0) RETURNING *", [req.body.name, req.body.location])
            res.status(201).json({
                status: "success",
                data: {
                    restaurant: results.rows[0]
                },
            })
        } catch (error) {
            console.log(error)
        }
    })


    // update a restaurant
    app.put("/api/v1/restaurants/:id", async (req, res) => {
        try {
            const results = await db.query("UPDATE restaurants SET r_name = $1, r_loc = $2 WHERE r_id = $3 RETURNING *", [req.body.name, req.body.location, req.params.id])
            res.status(200).json({
                status: "success",
                data: {
                    restaurant: results.rows[0]
                },
            })
        } catch (error) {
            console.log(error)
        }

    })


    // delete a restaurant
    app.delete("/api/v1/restaurants/:id", async (req, res) => {
        try {
            const results = await db.query("DELETE FROM restaurants WHERE r_id = $1", [req.params.id])
            res.send("Restaurant deleted successfully!")
        } catch (error) {
            console.log(error)
        }
        res.status(204).json({
            status: "success",
        })
    })


    // get customer info from id
    app.get("/api/v1/customers/:id", async (req, res) => {
        try {
            const results = await db.query("SELECT * FROM customers where c_id = $1", [req.params.id])
            res.status(200).json({
                status: "success",
                data: {
                    customer: results.rows
                },
            })
        } catch (error) {
            console.log(error)
        }
    })


    // create a dish
    app.post("/api/v1/dishes", async (req, res) => {
        try {
            const results = await db.query("INSERT INTO dishes (di_name , di_cost) VALUES ($1, $2) RETURNING *", [req.body.name, req.body.cost])
            res.status(201).json({
                status: "success",
                data: {
                    dishes: results.rows[0]
                },
            })
        } catch (error) {
            console.log(error)
        }
    })


    // update a dish
    app.put("/api/v1/dishes/:id", async (req, res) => {
        try {
            const results = await db.query("UPDATE dishes SET di_name = $1, di_cost =$2 WHERE di_id = $3 RETURNING *", [req.body.name, req.body.cost, req.params.id])
            res.status(200).json({
                status: "success",
                data: {
                    dishes: results.rows[0]
                },
            })
        } catch (error) {
            console.log(error)
        }
    })


    // delete a dish
    app.delete("/api/v1/dishes/:id", async (req, res) => {
        try {
            const results = await db.query("DELETE FROM dishes WHERE di_id = $1", [req.params.id])
            res.send("Dish deleted successfully!")
        } catch (error) {
            console.log(error)
        }
        res.status(204).json({
            status: "success",
        })
    })


    // delete a dish
    app.delete("/api/v1/reviews/:id", async (req, res) => {
        try {
            const results = await db.query("DELETE FROM reviews WHERE re_id = $1", [req.params.id])
            res.send("Review deleted successfully!")
        } catch (error) {
            console.log(error)
        }
        res.status(204).json({
            status: "success",
        })
    })


    // update a review
    app.put("/api/v1/reviews/:id", async (req, res) => {
        try {
            const results = await db.query("UPDATE reviews SET re_text = $1, re_rating = $2 WHERE re_id = $3 RETURNING *", [req.body.text, req.body.rating, req.params.id])
            res.status(200).json({
                status: "success",
                data: {
                    reviews: results.rows[0]
                },
            })
        } catch (error) {
            console.log(error)
        }
    })


}

module.exports = initRoutes