DELETE FROM shelf WHERE shelf_user = $1 AND shelf_book = $2;
UPDATE books SET book_stock = 'Yes' WHERE book_id = $2;
SELECT * FROM books INNER JOIN shelf ON books.book_id = shelf.shelf_book INNER JOIN libraryusers ON libraryusers.id = shelf.shelf_user WHERE libraryusers.id = $1;
 
