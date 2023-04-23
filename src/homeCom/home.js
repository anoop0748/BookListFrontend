import React, { useState } from "react";
import axios from 'axios'
// const geturl = "https://booklistbackend-nx2z.onrender.com/login/user/getBooks"
const geturl = "http://localhost:5000/login/user/getBooks"

function Home(){
    let token = window.localStorage.getItem('token');
    let [books, setbooks] = useState([]);
    let [addBookFlag,setAddBookFlag] = useState(false);
    let [newBook,setnewBook] = useState({})
    async function getdata(){
        let auth = {
            headers:{
                "authorization" : token,
                "content-type":"application/json"
            }
        }
        let data = await axios.get(geturl,auth);
        console.log(data.data.books)
        setbooks(data.data.books)
    }
    function addNewBook(){

    }
    function handleaddnewbook(){
        
    }
    return (
        <div>
            <div>
                <button>LogOut</button>
            </div>
            {addBookFlag?
            <>
                <div>
                <h1>Add Book</h1>
                <p>Create A new Book</p>
                <input type="text" onChange={(e)=>{setnewBook({title:e.target.value,...newBook})}}/>
                <input type="text" onChange={(e)=>{setnewBook({ISBN:e.target.value,...newBook})}}/>
                <input type="text" onChange={(e)=>{setnewBook({author:e.target.value,...newBook})}}/>
                <input type="text" onChange={(e)=>{setnewBook({description:e.target.value,...newBook})}}/>
                <input type="date" onChange={(e)=>{setnewBook({date:e.target.value,...newBook})}}/>
                <input type="text" onChange={(e)=>{setnewBook({publisherOfBook:e.target.value,...newBook})}}/>
                <button onClick={()=>{handleaddnewbook()}}>Submit</button>
                </div>

            </>:
            <>
                <h1>Book List</h1>
            <div>
                <button onClick={()=>{addNewBook()}}>+ Add New Book</button>
            </div>
            <div>
                {books?.map((val,idx)=>{
                    return(
                        <div key={idx}>
                            <img/>
                            <h3>{val.title}</h3>
                            <h5>{val.date}</h5>
                            <h3>{val.author}</h3>
                        </div>
                    )
                })}
            </div>
            </>
            }
        </div>
    )
}
export default  Home