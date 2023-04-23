import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './home.css'
const geturl = "https://booklistbackend-nx2z.onrender.com/login/user/getBooks"
// const geturl = "http://localhost:5000/login/user/getBooks";
const postBookurl = "https://booklistbackend-nx2z.onrender.com/login/user/postBooks";
// const postBookurl = "http://localhost:5000/login/user/postBooks";
const deleteUrl = "https://booklistbackend-nx2z.onrender.com/login/user/deleteBooks";
// const deleteUrl = "http://localhost:5000/login/user/deleteBooks";
const putBookurl = "https://booklistbackend-nx2z.onrender.com/login/user/putBooks";
// const putBookurl="http://localhost:5000/login/user/putBooks";


function Home() {
    let token = window.localStorage.getItem('token');
    let navigate = useNavigate();
    let [books, setbooks] = useState([]);
    let [addBookFlag, setAddBookFlag] = useState(false);
    let [newBook, setnewBook] = useState({});
    let [book_details, setBook_details] = useState({});
    let [bookDtFlag, setbookDtFlag] = useState(false);
    let [bookUpFlag, setBookUpFlag] = useState(false);
    let [updatedBook, setUpdatedBook] = useState({})
    async function getdata() {
        let auth = {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
                'Access-Control-Allow-Headers':
                    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
            }
        }
        let data = await axios.get(geturl, auth);
        console.log(data.data)
        setbooks(data.data.books)
    }
    function addNewBook() {
        setAddBookFlag(true)

    }
    async function handleAddnewbook(e) {

        e.preventDefault();
        if (newBook.title.length === 0 || newBook.ISBN.length === 0 || newBook.author.length === 0
            || newBook.description.length === 0) {
            return alert("Please Input valide Data to create new book")
        }

        let auth = {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*'
            }
        }
        console.log(newBook)
        let res = await axios.post(postBookurl, newBook, auth);
        if (res.status === 200) {
            setAddBookFlag(false);
            getdata();
        }
    }
    function logout() {
        window.localStorage.clear();
        navigate('/')

    }
    useEffect(() => {
        getdata()
        if (!token) {
            navigate('/');
        }
    }, [token]);
    function getbookDetails(idx) {
        let book = books[idx];
        setBook_details(book);
        setbookDtFlag(true)

    }
    async function handleUpdatebook(e) {
        console.log(updatedBook)
        e.preventDefault();
        if (updatedBook.title.length === 0 || updatedBook.ISBN.length === 0 || updatedBook.author.length === 0
            || updatedBook.description.length === 0) {
            return alert("Please Input valide Data to create new book")
        }

        let auth = {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*'
            }
        }
        console.log(updatedBook)
        let res = await axios.put(putBookurl, updatedBook, auth);
        if (res.status === 200) {
            setAddBookFlag(false);

            setbookDtFlag(false);
            setBookUpFlag(false);
            getdata();
        }
    }
    async function deleteBook() {
        let auth = {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "id": book_details._id
            }
        }
        let deleteRes = await axios.delete(deleteUrl, auth);
        if (deleteRes.status === 200) {
            showBookList();
        }

    }
    function updateBook() {
        setBookUpFlag(true);
        setUpdatedBook(book_details);
    }
    function showBookList() {
        setAddBookFlag(false);
        setbookDtFlag(false);
        setBookUpFlag(false);
        getdata()
    }
    return (
        <div className="home_main_cont">
            <div>
                <button id="logoutBtn" onClick={() => { logout() }}>LogOut</button>
            </div>
            {bookUpFlag ?
                <>
                    <div className="update_book_cont">
                        <button id="add_book_btn" onClick={() => { showBookList() }}>show book list</button>
                        <h1>Edit Book</h1>
                        <p>Update Book info</p>
                        <div>
                            <label>Title</label>
                            <input type="text" value={updatedBook.title} onChange={(e) => { setUpdatedBook({ ...updatedBook, title: e.target.value }) }} />
                        </div>
                        <div>
                            <label>ISNB</label>
                            <input type="text" value={updatedBook.ISBN} onChange={(e) => { setUpdatedBook({ ...updatedBook, ISBN: e.target.value }) }} />
                        </div>
                        <div>
                            <label>Author</label>
                            <input type="text" value={updatedBook.author} onChange={(e) => { setUpdatedBook({ ...updatedBook, author: e.target.value, }) }} />
                        </div>
                        <div>
                            <label>Description</label>
                            <input type="text" value={updatedBook.description} onChange={(e) => { setUpdatedBook({ ...updatedBook, description: e.target.value, }) }} />
                        </div>
                        <div>
                            <label>Date</label>
                            <input type="date" value={updatedBook.date} onChange={(e) => { setUpdatedBook({ ...updatedBook, date: e.target.value, }) }} />
                        </div>
                        <div>
                            <label>Publisher</label>
                            <input type="text" value={updatedBook.publisherOfBook} onChange={(e) => { setUpdatedBook({ ...updatedBook, publisherOfBook: e.target.value, }) }} />
                        </div>
                        <button onClick={(e) => { handleUpdatebook(e) }}>Submit</button>
                    </div>

                </>
                :
                <>
                    {bookDtFlag ? <>
                        <button id="add_book_btn" onClick={() => { showBookList() }}>Show Book List</button>
                        <h1>Book's Record</h1>
                        <h5>View Books Info</h5>
                        <table id="table">
                            <tr>
                                <td>1</td>
                                <td>Title</td>
                                <td>{book_details.title}</td>

                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Author</td>
                                <td>{book_details.author}</td>

                            </tr>
                            <tr>
                                <td>3</td>
                                <td>ISBN</td>
                                <td>{book_details.ISBN}</td>

                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Publisher</td>
                                <td>{book_details.publisherOfBook}</td>

                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Published Date</td>
                                <td>{book_details.date}</td>

                            </tr>
                            <tr>
                                <td>6</td>
                                <td>description</td>
                                <td>{book_details.description}</td>

                            </tr>
                        </table>
                        <div className="two_btnCont">
                            <button id="delete_btn" onClick={() => { deleteBook() }}>Delete Book</button>
                            <button id='edit_btn' onClick={() => { updateBook() }}>Edit Book</button>
                        </div>
                    </> :


                        <>
                            {addBookFlag ?
                                <>
                                    <div className="create_new_book">
                                        <button id="add_book_btn" onClick={() => { showBookList() }}>Show Book List</button>
                                        <h1>Add Book</h1>

                                        <p>Create A new Book</p>
                                        <input type="text" placeholder="Title" onBlur={(e) => { setnewBook({ ...newBook, title: e.target.value }) }} />
                                        <input type="text" placeholder="ISBN" onBlur={(e) => { setnewBook({ ...newBook, ISBN: e.target.value }) }} />
                                        <input type="text" placeholder="Author" onBlur={(e) => { setnewBook({ ...newBook, author: e.target.value, }) }} />
                                        <input type="text" placeholder="Description" onBlur={(e) => { setnewBook({ ...newBook, description: e.target.value, }) }} />
                                        <input type="date" placeholder="Date" onBlur={(e) => { setnewBook({ ...newBook, date: e.target.value, }) }} />
                                        <input type="text" placeholder="Book Publisher" onBlur={(e) => { setnewBook({ ...newBook, publisherOfBook: e.target.value, }) }} />
                                        <button onClick={(e) => { handleAddnewbook(e) }}>Submit</button>
                                    </div>

                                </> :
                                <>
                                    <h1>Book List</h1>
                                    <div>
                                        <button id="add_book_btn" onClick={() => { addNewBook() }}>+ Add New Book</button>
                                    </div>
                                    <div className="books_cont">
                                        {books?.map((val, idx) => {
                                            return (
                                                <div className="book_show" key={idx} onClick={() => { getbookDetails(idx) }}>
                                                    <img src="./" />
                                                    <h3>{val.title}</h3>
                                                    <h5>{val.date}</h5>
                                                    <h3>{val.author}</h3>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            }
                        </>
                    }
                </>
            }
        </div>
    )
}
export default Home