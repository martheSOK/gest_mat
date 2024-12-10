// import { useContext } from "react";
// import { AppContext } from "../Context/AppContext";
import img from '/public/img.jpeg';
import Layout from "../composants/Layout";

export default function Home() {

    return (
        <Layout>
                <div className="grid grid-cols-3">
                    <div className="bg-gray-700 w-[15rem] h-[22rem] m-auto rounded-[10px] mt-[20px] shadow-2xl">
                        <div className="">
                            <div className=" w-[15rem] h-[12rem] overflow-hidden">
                                <img className="h-[100%] w-[100%] object-fill" src={img} alt="image"/> 
                            </div>
                            <div className=" w-[15rem] h-[10rem]">
                                <h1 className="text-center text-white ">FRUIT</h1>
                                <div className="flex  justify-between items-center bg-black px-5 h-[8rem]">
                                    <p className="text-white">all</p>
                                    <button className="text-white text-center bg-green-900 rounded-[2px] w-[80px] h-[20pX]" type="submit">Buy</button>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
        </Layout>
    );
    
}