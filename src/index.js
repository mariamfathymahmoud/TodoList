import React, { isValidElement } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AiFillHeart } from "react-icons/ai";
import { FcTodoList } from "react-icons/fc";
import { BsFillXCircleFill } from "react-icons/bs";
import { MdAddTask} from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import {BsCheck2Circle} from "react-icons/bs";


class Main extends React.Component{
  state={ //dummy data
    items:[
      {id:1,name:"study react",done:"done",date:"4/6/2022" , completed:"false"},
      {id:2,name:"study css",done:"notdone",date:"22/9/2022" ,completed:"true"}
      
    ]
  }

  //delete function
  deleteitem = (id) =>{
   let items =this.state.items;
   let i =items.findIndex(item =>item.id=id)
   items.splice(i,1)
   this.setState({items})
  }
  //edit function
    additem =(item)=>{
      item.id= Math.random();
    let items=this.state.items;
    items.push(item);
    this.setState({items})
    }
    //complete todo
    completetodo =(id)=>{
      let items = items.map((item) => {
        if(item.id === id) {
          item.completed = !item.completed
        }
        return item
      })
      this.setState(items)
    }
    //favourite function
    addfav =(item)=>{
      item.id= Math.random();
    let listname=this.state.listname;
    listname.push(item);
    this.setState({listname})
    }
  render(){
    return(
      <div className='main-contannier'>
      <div className='left-contannier'>
     <Activity
     items={this.state.items} 
   listname={this.state.listname}
     deleteitem ={this.deleteitem}
     completetodo ={this.completetodo }
   addfav={this.addfav}
     />
      </div>
      <div className='rigth-contannier'>
      <Form 
      additem={this.additem}
        />
  <Fav />
      </div>
      </div>
    )
  }
}
//form component 
class Form extends React.Component{
  state={
    name:"",
    done:"",
    date:"",
  };
  
  handelchande =(e) => {
   this.setState({
   [e.target.id] : e.target.value
   })
  }
  handelsumbit =(e) =>{ //update my state
   e.preventDefault(); //refresh
   this.props.additem(this.state)
   this.setState({
    name:"",
    done:"",
    date:""
   })

  }
  constructor(props){
      super(props);
  }
  render(){
      return(
          <div  className='form-input'> 
          <h2 className='input-title'> <MdAddTask style={{marginRight:"10px"}} />Add Activity</h2>
          <form onSubmit={this.handelsumbit}>
             <textarea type="text" placeholder='Activity name' className='inputs' id='name' onChange={this.handelchande} value={this.state.name}/>
             <br/>
             <input type ="text" placeholder='Done or not' className='inputs' id='done' onChange={this.handelchande} value={this.state.done}/>
             <br/>
             <input type="date" className='inputs' id='date' onChange={this.handelchande} value={this.state.date}/>
             <input type="submit" value="Add" className='btn'/>
             </form>
          </div>
      )
  }
} 
//activity component
//add activity contannier
 const Activity =(props)=>{
  const {items ,deleteitem ,addfav,completetodo }=props;
  const listitem = items.map(item => {
    return(
      <div key={item.id}>
        <ul>
         
      <li className={item.done=="done" ? "span-style  complete" :'span-style' }  ><span  >Task name : </span>  {item.name} 
       <BsCheck2Circle style={{marginLeft:"300px" ,cursor:"pointer" ,color:"white"}}  onClick={()=>completetodo(item.id) }/>
      <BsTrash onClick={()=>deleteitem(item.id)} style={{color:"white" ,cursor:"pointer" ,paddingRight:"15px" ,paddingLeft:"15px"}}/>
      <AiFillHeart 
        style={{color:"red" ,cursor:"pointer"}} onClick={ ()=>addfav(item.id)}/> 
        </li> 
      <span> <span className='span-style'>Task progreess : </span>{item.done}</span>
      <br/>
      <span> <span className='span-style'>Task date : </span> {item.date}</span>
     
      </ul>
    
      </div>
    )
  })
  return(
    <div className='listitem'>
      <h2 className='title'>  <FcTodoList style={{paddingRight:"10px"}}/>Todo-List</h2>
   {listitem}
    </div>
  )
 }
 //fav component
class Fav extends React.Component{
  state={
  listname:[
    {id:"1",name:"Go to Gym"},
    {id:"2",name:"Study Web"}
   ]
  }
  render(){
    const data=this.state.listname.map((item)=>{ //loop in list item
      return(
        <div key={item.id}>
          <p className='fav-data'>{item.name}</p>
          </div>
      )
    })
    return(
      <div >
        <h2 className='fav-style'>Favourite taks</h2>
        <p >{data}</p>
     
      </div>
    )
  }
}

 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
