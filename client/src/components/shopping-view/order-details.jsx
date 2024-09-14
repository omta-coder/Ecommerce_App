import { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

const ShoppingOrderDetailsView = () => {
  return (
    <div>
    <DialogContent className="sm:max-w-[600px]">
        <div className='grid gap-6'>
            <div className='grid gap-2'>
                <div className='flex mt-6 items-center justify-between'>
                    <p className='font-medium'>Order Id</p>
                    <Label>123456</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Date</p>
                    <Label>12/05/2016</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Price</p>
                    <Label>$1000</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Status</p>
                    <Label>In Process</Label>
                </div>
            </div>
            <Separator/>
            <div className='grid gap-4'>
                <div className='grid gap-2'>
                    <div className='font-medium'>Order Details</div>
                    <ul className='grid gap-3'>
                        <li className='flex items-center justify-between'>
                            <span>Product One</span>
                            <span>$500</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='grid gap-4'>
                <div className='grid gap-2'>
                    <div className='font-medium'>Shipping Infp</div>
                    <div className="grid gap-0.5 text-muted-foreground">
                        <span>jay</span>
                        <span>goa</span>
                        <span>India</span>
                        <span>12340989</span>
                        <span>12340989</span>
                        <span>hello</span>
                    </div>
                </div>
            </div>

        </div>
    </DialogContent>
</div>
  )
}

export default ShoppingOrderDetailsView