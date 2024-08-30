import React, { useEffect, useState } from 'react'
import { db } from '../config/FirebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { MdDelete,MdEdit } from "react-icons/md";
import { IoMdSave } from "react-icons/io";


function TodoApp() {

    const [todo,setTodo]= useState("");
    const [todoItems,setTodoItems] = useState([]);
    const [edit,setEdit] = useState(null);
    const [update,setUpdate] = useState("");


    const addTodo = async ()=>{
        setTodo("");
       try {
        const docRef = await addDoc(collection(db,"todos"),{todo})
        console.log("added")
       }catch(err){
        console.error(err);
       }
       getData();
       
    }

    useEffect(()=>{
        getData()
        console.log("geting");
    },[]);

    const getData = async ()=>{
       const arr = []
       const  querySnapshot = await getDocs(collection(db,"todos"));
       querySnapshot.forEach((doc)=>{
        arr.push({...doc.data(),id:doc.id})
       })
       setTodoItems(arr);
    }

    const delteTodo= async (id)=>{
        await deleteDoc(doc(db,"todos",id));
        getData();
    }
    const editValue = (e,id)=>{
        setEdit(id);
        setUpdate(e.todo); 
     }
    const updataTodo = async (id)=>{
        await updateDoc(doc(db,"todos",id),{todo:update});
        await getData();
        setEdit(null);
    }

  return (
    <div className='max-w-[500px] border-2 m-auto px-2 flex flex-col gap-4 bg-white h-[500px] overflow-y-scroll no-scrollbar py-2 shadow-md'>
        <div>
            <h1 className='text-center text-lg font-semibold'>Todo App With Firebase</h1>
        </div>

        <div className='flex gap-2'>
            <input type="text"
            className='border-2 w-5/6 py-1 rounded-sm px-2'
            value={todo}
            onChange={(e)=>setTodo(e.target.value)}
            />
            <button 
            className='bg-gradient-to-r from-pink-600 to-purple-600 w-1/6 text-white rounded-sm'
            onClick={addTodo}
            >+</button>
        </div>

        <div className='bg-purple-700'></div>

           {todoItems.length == 0 && <h1 className='text-center'>No Todo.</h1>} 
           {todoItems.map((e,i)=>(
                 <div className='flex justify-between gap-2' key={e.id} >
                 {
                  edit === e.id ? 
                  <input  type="text" value={update} onChange={(e)=>setUpdate(e.target.value)}  className={` px-1 outline-none w-10/12 border-2 `}/>
                  :
                  <p className='w-10/12 12py-1 px-1 text-lg break-words'>{e.todo}</p>
                 }

                 <div className='flex gap-1 w-3/12 overflow-hidden'>
                 {
                  edit === e.id ? 
                  <button className='bg-gradient-to-r flex justify-center items-center from-pink-600 to-purple-600 text-white px-1 w-full'onClick={()=>updataTodo(e.id)}><IoMdSave/></button>
                  :
                  <button className='bg-gradient-to-r flex justify-center items-center from-pink-600 to-purple-600 text-white px-1 w-full'onClick={()=>editValue(e,e.id)}><MdEdit/></button>
                 }
                       <button className='bg-gradient-to-r flex justify-center items-center from-pink-600 to-purple-600 text-white px-1 w-full'onClick={()=>delteTodo(e.id)}><MdDelete/></button>
                 </div>
             </div>  
            ))}
        
    </div>
  )
}

export default TodoApp