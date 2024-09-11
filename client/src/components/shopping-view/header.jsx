import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

const MenuItems = () => {
  const navigate = useNavigate()

  const handleNavigate = (getCurrentMenuItem) =>{
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products"
      ? {
        category: [getCurrentMenuItem.id],
      }
    : null;
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate(getCurrentMenuItem.path);    
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const {user} = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false)
   const navigate  = useNavigate()
   const dispatch = useDispatch()

   const handleLogout = () =>{
    dispatch(logoutUser())
   }

   useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
   },[dispatch])

   console.log(cartItems,"asdfghjklpoiuytrewqsdfvbn ");
   

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
        <Button onClick={()=>setOpenCartSheet(true)} variant="outline" size="icon" className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }/>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">{user?.userName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={()=>navigate("/shop/account")}>
            <UserCog className="w-4 h-4 mr-2"/>
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2"/>
            LogOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  

  return (
    <header className="sticky w-full border-b bg-background z-40 top-0">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
       <div className="hidden lg:block">
        <HeaderRightContent/>
      </div> 
      </div>
    </header>
  );
};

export default ShoppingHeader;
