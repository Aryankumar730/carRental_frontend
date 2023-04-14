import React from 'react';
import { useState } from 'react';
import dataContext from './DataContext';

function DataState(props) {

    const host = 'https://car-rental.adaptable.app';

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);  //initial empty state for the notes
    const [alert, setAlert] = useState(null);  // state for the alert
    const [login, setlogin] = useState(true);  // state fo the loginBox

    const[display, setDisplay] = useState(false); // state for the log out button display

    const[profile, setProfile] = useState(false); // state for the profile page in header
    

    

     //Getting all notes

     async function getNotes(){

        //Making the API call to add note
        const response = await fetch(`${host}/api/authdata/fetchallnotes`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'auth-token' : localStorage.getItem('token')
          },
         
  
        });
        const jsonall = await response.json();
        console.log(jsonall);
        setNotes(jsonall)
  
      }
  
  
      //Add a note
      async function addNote(Aname, Vmodel, Vnumber, Scapacity, Rent, city, country, image, Aemail){
  
        //Making the API call to add note
        const response = await fetch(`${host}/api/authdata/adddata`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
          },
          body: JSON.stringify({Aname, Vmodel, Vnumber, Scapacity, Rent, city, country,image, Aemail})
        });
        console.log("adding a new node");
        const note = await response.json();
        setNotes(notes.concat(note))     
      }
  
      //Delete a note
      async function deleteNote(id){
  
        //Making the API call to delete
  
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
          },
          
  
        });
        const json = await response.json();
        console.log(json);
  
        console.log("deleting"+ id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
  
  
      }
  
      //Update a note
      async function editNote(id, title, description, tag){
  
        //Making the API call to edit
        
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
  
        });
        const json1 = await response.json();
        console.log(json1);
  
  
        // Logic to edit in the client
        let newNotes = JSON.parse(JSON.stringify(notes))
        // let newNotes = json1;
  
          newNotes.forEach((element)=>{
          if(element._id === id){
  
            element.title = title;
            element.description= description;
            element.tag = tag;
            
          }
        
        })
        console.log(notes);
        setNotes(newNotes)
      
      }

      // setting up the alert

      function showAlert(message, type, header) {
        setAlert({
          msg: message,
          type: type,
          header: header,
        })
        setTimeout(() => {
          setAlert(null)
    
        }, 5000);
      }

  return (
        <dataContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes, 
        alert, showAlert , login, setlogin, display, setDisplay , profile, setProfile }}>
            {props.children}
        </dataContext.Provider>          
  )
}

export default DataState;

