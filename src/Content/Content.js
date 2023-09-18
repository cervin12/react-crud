import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Content() {

    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('https://backendexample.sanbercloud.com/api/mobile-apps')
        .then((res)=>{
            setData([...res.data])
        })
        .catch((e)=> console.log(e.message))
    },[])

    function checkSize(size){
        return size > 999 ? <span> {Math.ceil(size/1000)} Gb</span> : <span> {size} Mb</span>
    }

    function checkImg(url){
        return url === null ? 'https://cdn1.epicgames.com/offer/4bc43145bb8245a5b5cc9ea262ffbe0e/EGS_MarvelsSpiderManRemastered_InsomniacGamesNixxesSoftware_S1_2560x1440-73702d11161b29a0b7c40a8b489b1808?h=270&resize=1&w=480' : url
    }

    function checkDevice(android, ios){
        let text =''

        if(android === 1  && ios === 1 ){
            text = ' Android & IOS'
        } else if ( android === 1 && ios === 0){
            text = ' Android'
        } else if ( android === 0 && ios === 1){
            text = ' iOS'
        } else {
            text = ' Soon'
        }

        return text
    }
    

  return (
    <div>
        <section class="bg-gray-200 p-5">

        <div class="container mx-auto mt-10">
            <h1 class="text-xl font-bold ">Find your data that you need!</h1>
        </div>

        <div class="container mx-auto flex-wrap flex gap-10 items-center justify-start">

            {/* Card */}
            {
                data!== null && data.map((res)=> {
                    return(
                        <div key={res.id} class="mt-10 h-72 flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
                        <img alt={res.image_url} src={checkImg(res.image_url)}
                            class="w-1/3 bg-cover bg-center bg-landscape" />
                        <div class="w-2/3 p-4">
                            <h1 class="text-gray-900 font-bold text-2xl">
                                {res.name}
                            </h1>
                            <small>{res.release_year}</small>
                            <p class="mt-2 text-gray-600 text-sm">
                               {res.description}
                            </p>
                            <div class=" item-center mt-2 text-gray-500">
                                <span>{res.category}</span>
                                {checkSize(res.size)}
                                {checkDevice(res.is_android_app, res.is_ios_app)}
                            </div>
                            <div class="flex item-center justify-between mt-3">
                                <h1 class="text-gray-700 font-bold text-xl">
                                    {res.price === 0 ? 'Free' : res.price}
                                </h1>
                                <button class="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                                    {res.rating} rating
                                </button>
                            </div>
                        </div>
                    </div>
                    )
                })
            }

        
            {/* Akhir Card */}


        </div>

    </section>

    </div>
  )
}
