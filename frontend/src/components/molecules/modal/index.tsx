import Button from '@/components/atoms/button';
import { ModalProps } from '@/interfaces/common';
import React from 'react';
import { CircleX } from 'lucide-react';

const Modal = ({ isOpen, onClose, children, zIndex, width, height, content }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={`absolute bg-black bg-opacity-[0.7] top-0 left-0 w-full h-screen ${zIndex ? `${zIndex}` : 'z-10'}`} onClick={onClose}>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md ${width ? `${width}` : "w-[calc(100%-40px)]"} ${height ? `${height}` : "h-[calc(100%-40px)]"} p-4`}
                onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col gap-4 mt-5">
                    <p className="text-gray-800 font-bold text-center">
                        {content}
                    </p>
                    <div className="flex justify-center gap-5">
                        {children}
                    </div>
                </div>
                <Button type="button" className='absolute top-2 right-2' hasBackground={false} hasIcon icon={<CircleX className='w-6 h-6 text-red-400' />} onClick={onClose}></Button>
            </div>
        </div>
    );
};

export default Modal;