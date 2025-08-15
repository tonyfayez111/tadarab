import React from 'react'

export default function Sale({ status, discount }: { status: boolean, discount: number }) {
    return (
        <div>
            {status && (
                <div className='bg-[#29295199] backdrop-blur-[100px] grid grid-flow-col auto-cols-max justify-center items-center h-[48px] px-4 md:px-0'>
                    <div className='flex md:flex-row gap-2 md:gap-5 justify-center items-center'>
                        <div className='text-white text-[12px] md:text-[14px] font-[800] underline text-center md:text-left'>
                            اشترك الأن
                        </div>
                        <div className='text-white text-[10px] md:text-[14px] font-[700] text-center md:text-left'>
                            خصم {discount}% بمناسبة شهر رمضان الكريم لفترة محدودة
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}