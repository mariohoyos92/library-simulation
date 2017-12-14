INSERT INTO shelf (shelf_user , shelf_book) VALUES($1, $2) RETURNING shelf_id, shelf_user, shelf_book;
UPDATE books SET book_stock ='No' WHERE book_id = $2; 