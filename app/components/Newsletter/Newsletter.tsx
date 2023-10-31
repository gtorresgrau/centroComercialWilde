"use client"
import { news } from "@/app/Constants/userinfo";
import { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import Loading from "../Loading";

const Newsletter = () => {

    const [inputValues, setInputValues] = useState({
        newsletter: '',
    });

    const alert = () => {
        Swal.fire({
        title: `Ha sido enviado correctamente.`,
        text: `Solo enviaremos información sobre próximos eventos al email: ${inputValues.newsletter}`,
        icon: "success",
        confirmButtonText: "Ok",
        })  
    };

    const alertLoading = () => {
        Swal.fire({
        title: `Hola, tu email se esta enviando a nuestra base de datos`,
        showConfirmButton: false,
        });  
    };

    const handleClick = () => {
        console.log('News:',inputValues.newsletter)
    }

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({ ...prevState, [name]: value }));
    }
        // FORM SUBMIT
        const handleSubmit = async (event:any) => {
            event.preventDefault();
            try {
                alertLoading();
                const response = await axios.post('/api/contact', inputValues); // Utiliza Axios para hacer la solicitud POST
                console.log('Response received: ', response.data);
                Swal.close();
                if (response.status === 200) {
                    alert();
                    setInputValues({
                        newsletter: '',
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

    return (
        <section id="join-section" className='-mt-32 relative z-5'>
            <div className="mx-auto max-w-2xl py-16 md:py-24 px-4 sm:px-6 md:max-w-7xl lg:px-24 bg-orange rounded-lg bg-newsletter">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
                    {/* COLUMN-1 */}
                    <form onSubmit={handleSubmit} >
                        <h2 className="text-5xl text-white font-bold mb-3 text-shadow">{news.title}</h2>
                        <h3 className="text-lg text-white font-medium mb-7 text-shadow">{news.subTitle}</h3>
                        <div className="flex gap-2">
                            <input 
                                 id="email"
                                 name="newsletter"
                                 value={inputValues.newsletter}
                                 onChange={handleChange}
                                 type="email"
                                 className="py-4 text-sm w-full text-black bg-white rounded-md pl-4" 
                                 placeholder="Ingrese su email"
                                 autoComplete="off"
                            />
                            <button type="submit" onClick={handleClick} className="bg-purple hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">{news.btn}</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Newsletter;