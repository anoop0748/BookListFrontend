import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './home.css'
import Spinner from "../loader/loader";
const geturl = "https://booklistbackend-nx2z.onrender.com/login/user/getBooks"
//const geturl = "http://localhost:5000/login/user/getBooks";
const postBookurl = "https://booklistbackend-nx2z.onrender.com/login/user/postBooks";
//const postBookurl = "http://localhost:5000/login/user/postBooks";
const deleteUrl = "https://booklistbackend-nx2z.onrender.com/login/user/deleteBooks";
//const deleteUrl = "http://localhost:5000/login/user/deleteBooks";
const putBookurl = "https://booklistbackend-nx2z.onrender.com/login/user/putBooks";
//const putBookurl = "http://localhost:5000/login/user/putBooks";


function Home() {
    let token = window.localStorage.getItem('token');
    let navigate = useNavigate();
    let [books, setbooks] = useState([]);
    let [addBookFlag, setAddBookFlag] = useState(false);
    let [newBook, setnewBook] = useState({});
    let [book_details, setBook_details] = useState({});
    let [bookDtFlag, setbookDtFlag] = useState(false);
    let [bookUpFlag, setBookUpFlag] = useState(false);
    let [updatedBook, setUpdatedBook] = useState({});
    let [spinner, setSpinner] = useState(false);
    // on mouse up render button
    let [mouseUpBookInf,setMouseUpBookInf] = useState(false);
    let [mouseUpIdex, setmouseUpIdex] = useState(null);

    // getting data from server;
    async function getdata() {
        let auth = {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json,multipart/form-data",
                'Access-Control-Allow-Headers':
                    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
            }
        }
        let data = await axios.get(geturl, auth);
        setbooks(data.data.books)
    }
    function addNewBook() {
        setAddBookFlag(true)

    }
    const [prvImg, setprvImg] = useState("#");
    async function handleAddnewbook(e) {
        e.preventDefault();

        if (newBook.title.length === 0 || newBook.ISBN.length === 0 || newBook.author.length === 0
            || newBook.description.length === 0) {
            return alert("Please Input valide Data to create new book")
        }

        let auth = {
            headers: {
                "Authorization": token,
                "Content-Type": "multipart/form-data",

                "Access-Control-Allow-Origin": '*'
            }
        }
        setSpinner(true);
        let bookimg = new FormData();
        for (let keys in newBook) {
            bookimg.append(keys, newBook[keys]);
        }
        console.log(bookimg)
        let res = await axios.post(postBookurl, bookimg, auth);
        if (res.status === 200) {
            setSpinner(false);
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

    // getting on click book details

    function getbookDetails(idx) {
        let book = books[idx];
        setBook_details(book);
        setbookDtFlag(true)

    }
    // Update exting Book
    const [upBImgPrv,setupBImgPrv] = useState("")
    async function handleUpdatebook(e) {
        e.preventDefault();
        if (updatedBook.title.length === 0 || updatedBook.ISBN.length === 0 || updatedBook.author.length === 0
            || updatedBook.description.length === 0) {
            return alert("Please Input valide Data to create new book")
        }

        let auth = {
            headers: {
                "Authorization": token,
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": '*'
            }
        }
        setSpinner(true);
        let updateBookData = new FormData();
        for (let keys in updatedBook) {
            updateBookData.append(keys, updatedBook[keys]);
        }
        let res = await axios.put(putBookurl, updateBookData, auth);
        if (res.status === 200) {
            setSpinner(false);
            setAddBookFlag(false);
            setbookDtFlag(false);
            setBookUpFlag(false);
            getdata();
        }
        else{
            setSpinner(false);
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
        setSpinner(true);
        let deleteRes = await axios.delete(deleteUrl, auth);
        if (deleteRes.status === 200) {
            setSpinner(false);
            showBookList();
        }
        else{
            setSpinner(false);
        }

    }

    // togle to update book page

    function updateBook() {
        setBookUpFlag(true);
        setUpdatedBook(book_details);
        setupBImgPrv(book_details.bookImg);
        
    }
    function showBookList() {
        setAddBookFlag(false);
        setbookDtFlag(false);
        setBookUpFlag(false);
        getdata()
    }
    //function for mouse enter from book;
    function funOnMouseEnter(i){
        setmouseUpIdex(i);
        setMouseUpBookInf(true);
    }

    //function for mouse leave from book
    function funMouseLeave(){
        setmouseUpIdex(null);
        setMouseUpBookInf(false);
    }
    return (
        <>
            {spinner ? <Spinner /> : ""}
        
        <div className="home_main_cont">
            
            <div>
                <button id="logoutBtn" onClick={() => { logout() }}>LogOut</button>
            </div>
            {bookUpFlag ?
                <>
                {/* Update Exiting Book */}

                    <div className="update_book_cont">
                        <button id="add_book_btn" onClick={() => { showBookList() }}>show book list</button>
                        <h1>Edit Book</h1>
                        <p>Update Book info</p>
                        <div id="upBImg-cont">
                            <img src={upBImgPrv} />
                                <input type="file" placeholder="Upload Book Image" accept="image/*" onChange={(e) => { setUpdatedBook({ ...updatedBook, bookImg: e.target.files[0] }); setupBImgPrv(URL.createObjectURL(e.target.files[0])) }} />
                            </div>
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
                            <label>Geners</label>
                            <input type="text" value={updatedBook.genres} onChange={(e) => { setUpdatedBook({ ...updatedBook, geners: e.target.value, }) }} />
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
                {/* Book details UI */}

                    {bookDtFlag ? <>
                        <button id="add_book_btn" onClick={() => { showBookList() }}>Show Book List</button>
                        <h1>Book's Record</h1>
                        <h5>View Books Info</h5>
                        <table id="table">
                            <tr>
                                <td></td>
                                <td>Cover Photo</td>
                                <td><img id="bkdImg" src={book_details.bookImg} alt="Book cover Photo"/></td>
                            </tr>
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
                                <td>{new Date(book_details.date).toDateString()}</td>

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

                            // create new book UI
                        <>
                            {addBookFlag ?
                                <>
                                    <div className="create_new_book">
                                        <button id="add_book_btn" onClick={() => { showBookList() }}>Show Book List</button>
                                        <h1>Add Book</h1>

                                        <p>Create A new Book</p>
                                        <div>
                                            <img src={prvImg} />
                                            <input type="file" placeholder="Upload Book Image" accept="image/*" onChange={(e) => { setnewBook({ ...newBook, bookImg: e.target.files[0] }); setprvImg(URL.createObjectURL(e.target.files[0])) }} />
                                        </div>

                                        <input type="text" placeholder="Title" onBlur={(e) => { setnewBook({ ...newBook, title: e.target.value }) }} />
                                        <input type="text" placeholder="ISBN" onBlur={(e) => { setnewBook({ ...newBook, ISBN: e.target.value }) }} />
                                        <input type="text" placeholder="Author" onBlur={(e) => { setnewBook({ ...newBook, author: e.target.value, }) }} />
                                        <input type="text" placeholder="Description" onBlur={(e) => { setnewBook({ ...newBook, description: e.target.value, }) }} />
                                        <input type="text" placeholder="Genres" onBlur={(e) => { setnewBook({ ...newBook, genres: e.target.value, }) }} />
                                        <input type="text" placeholder="Book Publisher" onBlur={(e) => { setnewBook({ ...newBook, publisherOfBook: e.target.value, }) }} />
                                        <button onClick={(e) => { handleAddnewbook(e) }}>Submit</button>
                                    </div>

                                </> :

                                // All book show on home Page

                                <>
                                    <h1>Book List</h1>
                                    <div>
                                        <button id="add_book_btn" onClick={() => { addNewBook() }}>+ Add New Book</button>
                                    </div>
                                    <div className="books_cont">
                                        {books?.map((val, idx) => {
                                            return (
                                                //  onMouseLeave={()=>{funMouseLeave()}}
                                                <div className="book_show" key={idx} onClick={() => { getbookDetails(idx) }}
                                                 onMouseEnter={()=>{funOnMouseEnter(idx)}} onMouseLeave={()=>{funMouseLeave()}}>
                                                    <img src={val.bookImg} />
                                                    <h3>Title - {val.title}</h3>
                                                    <span>Date - {new Date(val.date).toLocaleDateString()}</span>
                                                    <h3>Genres - {val.genres}</h3>
                                                    {mouseUpBookInf && idx === mouseUpIdex?<button id="about-book-btn" onClick={() => { getbookDetails(idx) }}>About Book</button>:""}
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
        </>
    )
}
export default Home