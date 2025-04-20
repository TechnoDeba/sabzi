import React, { useContext, useState } from 'react'
import Nav from '../Components/Nav'
import Categories from '../Category'
import Card from '../Components/Card'
import food_items from '../food'
import { dataContext } from '../Context/UserContext'
import {RxCross2} from "react-icons/rx"
import Card2 from '../Components/Card2'
import { useSelector } from 'react-redux'
import { LuBanana } from "react-icons/lu";
import { toast } from 'react-toastify';

const Home = () => {
let {cate,setCate,input,showCart,setShowCart}=useContext(dataContext);
const filter =(category)=>{
if(category==="All"){
  setCate(food_items)
}
else {
  let newList = food_items.filter((item)=>(item.food_category===category))
  setCate(newList);
}
}
let items=useSelector(state=>state.cart)
let subtotal=items.reduce((total,item)=> total+item.qty*item.price,0);
let deliveryFee=20;
let taxes=subtotal*0.5/100;
let grandTotal=Math.floor(taxes+deliveryFee+subtotal);

console.log(subtotal);
  return (
    <div className='bg-slate-200 w-full min-h-screen'>
      <Nav/>
{!input?
  <div className='flex flex-wrap justify-center items-center gap-5 w-[100%]'>
        {Categories.map((item)=>{
        return  <div className='w-[140px] h-[150px] bg-white flex flex-col items-center gap-5 p-5 text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 transition-all duration-200' onClick={() => filter(item.name)} >
            {item.icon} 
            {item.name}
          </div>
        })}
      </div>:null}
      
      <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center py-8'>
        {cate.length>1?cate.map((item)=>(
          <Card name={item.food_name} image={item.food_image} price={item.price} id={item.id} type={item.food_type} />
        )):<div className='flex flex-col items-center gap-4 text-center text-3xl text-green-500 font-semibold
pt-5 '> 
          No Dish Found
          <LuBanana className='w-[300px] h-[300px] text-green-500'/>
          </div>}
        
      </div>
      <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 transition-all duration-500 flex flex-col items-center overflow-auto ${showCart?"translate-x-0":"translate-x-full"}`}>
        <header className='w-full flex justify-between items-center'>
          <span className='font-semibold text-green-400 text-[18px] '>Order items</span>
          <RxCross2 className='font-semibold text-green-400 text-[18px] h-[30px] w-[30px] cursor-pointer hover:text-green-600' onClick={()=>{
  setShowCart(false)}}/>
        </header>
        {items.length? <>
       <div className='w-full mt-8 flex flex-col gap-5'>
        {items.map((item)=>(
          <Card2 name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty}/>
        ))}
       </div>
       <div className='w-full  border-y-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>
<div className='w-full flex justify-between items-center'>
  <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
  <span className='text-lg text-green-400 font-semibold' >Rs {subtotal}/-</span>
</div>
<div className='w-full flex justify-between items-center'>
  <span className='text-lg text-gray-600 font-semibold'>Delivery Fee</span>
  <span className='text-lg text-green-400 font-semibold' >Rs {deliveryFee}/-</span>
</div>
<div className='w-full flex justify-between items-center'>
  <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
  <span className='text-lg text-green-400 font-semibold' >Rs {taxes}/-</span>
</div>
       </div>
       <div className='w-full flex justify-between items-center  p-9'>
  <span className='text-2xl text-gray-600 font-semibold'>Total</span>
  <span className='text-2xl text-green-400 font-semibold' >Rs {grandTotal}/-</span>
</div>
<button className='w-[80%] p-3 rounded-lg bg-green-500 text-white hover:bg-green-400  transition-all cursor-pointer' onClick={()=>{
  toast.success("Order Placed")
}}>Place Order</button>
</>:
<div className='text-center text-2xl text-green-500 font-semibold
pt-5 '>
  Empty Cart
  </div>
  }
       
      </div>
    </div>
  )
}

export default Home