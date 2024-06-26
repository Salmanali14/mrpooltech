import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/Modalcontext';
import Singleproduct from './Singleproduct';
import upper from '../imgs/pooltecuper.jpeg';
import lower from '../imgs/poolteclower.jpeg';
import { FaRegFilePdf } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const Invoice = () => {
    let { productData } = useContext(ModalContext);
    let [Qty] = useState(1);
    let [allprices, setallpricess] = useState([]);
    let price = 0;

    const generatePDF = () => {
        const element = document.getElementById('pdf-element');
        const opt = {
            margin: 0.5,
            filename: 'pooltech.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    };

    return (
        <div className='w-[100%] flex justify-center items-center min-h-[100vh] flex-col'>
        <div className='w-[90%] flex justify-center items-center min-h-[100vh] flex-col'>
            <div className='w-[100%] mt-[50px]' id='pdf-element'>
                <img src={upper} className='w-[100%]' alt="Upper" />
                <h1 className='text-xl font-[400] mb-[10px]'>Dear Sir/Madam,</h1>
                <p className='text-xl font-[400] mb-[7px]'>
                    With reference to your inquiry, we are pleased to quote as under your kind approval.
                </p>
                <div className='w-[100%] border mt-[15px] relative'>
                    <div className='w-[100%] flex justify-center items-center text-2xl font-[400] h-[50px]'>
                        Filtration System and Accessories
                    </div>
                    <div className='w-[100%] border h-[70px] flex'>
                        <div className='w-[15%] border flex justify-center items-center text-xl font-[400]'>S.NO</div>
                        <div className='w-[45%] border flex justify-center items-center text-xl font-[400]'>Items</div>
                        <div className='w-[20%] border flex justify-center items-center text-xl font-[400]'>QTY</div>
                        <div className='w-[20%] border flex justify-center items-center text-xl font-[400]'>Rate</div>
                    </div>
                    {productData?.map((s, i) => {
                        price += parseInt(s.price) * Qty;
                        return (
                            <Singleproduct
                                key={i}
                                name={s.productName}
                                price={s.price}
                                img={s.imgUrl}
                                description={s.description}
                                index={i}
                                totalprice={price}
                                allprices={allprices}
                                id={s.id}
                                setallpricess={setallpricess}
                                qty={s.qty ? s.qty : 1}
                            />
                        );
                    })}
                    <div className='h-[60px] border relative'>
                        <div className='flex items-center h-[60px] w-[40%] border absolute right-0'>
                            <h2 className='text-2xl font-[500] ml-2'>{"Total amount" + " "}</h2>
                            <p className='text-2xl font-[400] ml-2'>{' : '}{price} PKR</p>
                        </div>
                    </div>
                </div>
                <img src={lower} className='w-[100%]' alt="Lower" />
            </div>
            <button
                className='mt-5 border absolute top-[-10px] h-[35px] w-[90px] flex justify-around items-center'
                onClick={generatePDF}
            >
                <FaRegFilePdf className='text-red-600' />Export
            </button>
        </div>  </div>
    );
}

export default Invoice;
