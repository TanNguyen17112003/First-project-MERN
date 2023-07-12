const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const myDb = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "tan17112003",
    database: "test",
});

app.get("/", (req, res) => {
    res.json("hello");
});
// Get all items from database
app.get("/books", (req, res) => {
    const query = "SELECT * FROM books";
    myDb.query(query, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    })
})
// Post a book into database
app.post('/books', (req, res) => {
    const query = 'INSERT INTO books (title, description, price, cover) VALUES (?)';
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ];
    myDb.query(query, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
// Update / Put a book on database
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = 'UPDATE books SET title = ?, description = ?, price = ?, cover = ? WHERE id = ?';
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ];
    myDb.query(query, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
// Delete book with give i
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ?";
    myDb.query(query, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.listen(3500, () => {
    console.log(`You are running on port 3500`)
})