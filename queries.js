// TASK 1
// Insert sample books
db.books.insertMany([
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    published_year: 1925,
    price: 15.99,
    in_stock: true,
    pages: 218,
    publisher: "Scribner"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 281,
    publisher: "J.B. Lippincott & Co."
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 10.99,
    in_stock: false,
    pages: 328,
    publisher: "Secker & Warburg"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    published_year: 1997,
    price: 25.00,
    in_stock: true,
    pages: 309,
    publisher: "Bloomsbury"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 18.50,
    in_stock: true,
    pages: 310,
    publisher: "George Allen & Unwin"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    published_year: 1813,
    price: 9.99,
    in_stock: true,
    pages: 279,
    publisher: "T. Egerton"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Classic",
    published_year: 1951,
    price: 14.99,
    in_stock: false,
    pages: 277,
    publisher: "Little, Brown and Company"
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Thriller",
    published_year: 2003,
    price: 20.00,
    in_stock: true,
    pages: 454,
    publisher: "Doubleday"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    published_year: 1988,
    price: 13.50,
    in_stock: true,
    pages: 208,
    publisher: "HarperTorch"
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    genre: "Biography",
    published_year: 2018,
    price: 30.00,
    in_stock: true,
    pages: 448,
    publisher: "Crown Publishing Group"
  }
]);

// TASK 2
// queries.js

// Find all books in a specific genre (e.g., Fantasy)
db.books.find({ genre: "Fantasy" });

// Find books published after a certain year (e.g., after 2000)
db.books.find({ published_year: { $gt: 2000 } });

// Find books by a specific author (e.g., J.K. Rowling)
db.books.find({ author: "J.K. Rowling" });

// Update the price of a specific book (e.g., The Hobbit)
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 22.00 } }
);

// Delete a book by its title (e.g., The Catcher in the Rye)
db.books.deleteOne({ title: "The Catcher in the Rye" });


// TASK 3
// Find books that are both in stock and published after 2010
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } }
)

// Projection: return only title, author, and price
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
)

// Sort books by price (ascending)
db.books.find().sort({ price: 1 })

// Sort books by price (descending)
db.books.find().sort({ price: -1 })

// Pagination (5 books per page)
// Page 1
db.books.find().skip(0).limit(5)

// Page 2
db.books.find().skip(5).limit(5)

// Page 3
db.books.find().skip(10).limit(5)

//TASK 4
// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

// Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: { $multiply: [ { $floor: { $divide: [ "$published_year", 10 ] } }, 10 ] }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

//TASK 5
// Create an index on the title field
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Use explain() to show query performance with the index
db.books.find({ title: "The Great Gatsby" }).explain("executionStats")

db.books.find({ author: "J.K. Rowling", published_year: { $gt: 2000 } }).explain("executionStats")
