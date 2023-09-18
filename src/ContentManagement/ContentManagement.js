import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'

export default function ContentManagement() {

    const [data, setData] = useState(null)
    const [fetchStatus, setFetchStatus] = useState(true)
    const [id, setId] = useState(-1)
    const [input, setInput] = useState({
        name: '',
        description: '',
        category: '',
        size: 0,
        price: 0,
        rating: 0,
        image_url: '',
        release_year: 0,
        is_android_app: 0,
        is_ios_app:0
    })

    useEffect(() => {
        axios.get('https://backendexample.sanbercloud.com/api/mobile-apps')
        .then((res)=>{
            setData([...res.data])
        })
        .catch((e)=> console.log(e.message))
        setFetchStatus(false)
    },[fetchStatus, setFetchStatus])

    function handleInput(event){
        let name = event.target.name
        let value = event.target.value
        
    
        if(name === 'name'){
          setInput( {...input, name : value} )
        }else if(name === 'description'){
          setInput( {...input, description : value} )
        }else if(name === 'category'){
          setInput( {...input, category : value} )
        } else if(name === 'size'){
            setInput( {...input, size : value} )
        } else if(name === 'price'){
            setInput( {...input, price : value} )
        } else if(name === 'rating'){
            setInput( {...input, rating : value} )
        }else if(name === 'image_url'){
            setInput( {...input, image_url : value} )
        }else if(name === 'release_year'){
            setInput( {...input, release_year : value} )
        }else if(name === 'android'){
            setInput( {...input, is_android_app : value} )
        }else if(name === 'ios'){
            setInput( {...input, is_ios_app : value} )
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        let{
            name,
            description,
            category,
            size,
            price,
            rating,
            image_url,
            release_year,
            is_android_app,
            is_ios_app
        } = input

        if(id === -1) {
            axios.post('https://backendexample.sanbercloud.com/api/mobile-apps', { name,description,category,size,price,rating,image_url,release_year,is_android_app,is_ios_app})
            .then((res)=>{
                setFetchStatus(true)
                
                setInput({
                    name: '',
                    description: '',
                    category: '',
                    size: 0,
                    price: 0,
                    rating: 0,
                    image_url: '',
                    release_year: 0,
                    is_android_app: 0,
                    is_ios_app:0
                })
            })
            .catch((err)=>{
                console.log(err.message)
            })
        } else{
            axios.put(`https://backendexample.sanbercloud.com/api/mobile-apps/${id}`,{name,
            description,
            category,
            size,
            price,
            rating,
            image_url,
            release_year,
            is_android_app,
            is_ios_app})
            .then((res)=>{
                setFetchStatus(true)

                setInput({
                    name: '',
                    description: '',
                    category: '',
                    size: 0,
                    price: 0,
                    rating: 0,
                    image_url: '',
                    release_year: 0,
                    is_android_app: 0,
                    is_ios_app:0
                })

                setId(-1)
            })
            .catch((e)=> console.log(e.message))
        }
    }

    function handleEdit(e){
        let idData = e.target.value


        axios.get(`https://backendexample.sanbercloud.com/api/mobile-apps/${idData}`)
        .then((res) =>{
            setId(idData)
            setInput({
                name: res.data.name,
                description: res.data.description,
                category: res.data.category,
                size: res.data.size,
                price: res.data.price,
                rating: res.data.rating,
                image_url: res.data.image_url,
                release_year: res.data.release_year,
                is_android_app: res.data.is_android_app,
                is_ios_app: res.data.is_ios_app
            })


        })
        .catch((e) => console.log(e))

    }

    function handleDelete(e){
        let idData = e.target.value
        axios.delete(`https://backendexample.sanbercloud.com/api/mobile-apps/${idData}`)
        .then((res) => {
            setFetchStatus(true)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }



  return (
    <div>
        <Navbar/>
        <div className=" w-3/5 overflow-x-auto relative mx-auto my-20 rounded-lg drop-shadow-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-sky-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                No
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Nama
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Deskripsi
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Kategori
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Size
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Harga
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Rating
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Image URL
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Tahun Rilis
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Android
                            </th>
                            <th scope="col" className="py-3 px-6">
                                iOS
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { data!==null && data.map((res, index)=>{

                            
                            return(
                                <tr key={res.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className=" py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index +1}
                                </th>
                                <td className="py-4 px-6">
                                    {res.name}
                                </td>
                                <td className="py-4 px-6">
                                    {res.description}
                                </td>
                                <td className="py-4 px-6">
                                    {res.category}
                                </td>
                                <td className="py-4 px-6">
                                    {res.size}
                                </td>
                                <td className="py-4 px-6">
                                    {res.price}
                                </td>
                                <td className="py-4 px-6">
                                    {res.rating}
                                </td>
                                <td className="py-4 px-6">
                                    {res.image_url}
                                </td>
                                <td className="py-4 px-6">
                                    {res.release_year}
                                </td>
                                <td className="py-4 px-6">
                                    {res.is_android_app}
                                </td>
                                <td className="py-4 px-6">
                                    {res.is_ios_app}
                                </td>
                                <td>
                                <button value={res.id} onClick={handleEdit} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                                <button value={res.id} onClick={handleDelete} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <form className='w-3/5 mx-auto' onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                    <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name='name' onChange={handleInput} value={input.name} />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">description</label>
                    <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name='description' onChange={handleInput} value={input.description} /> 
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">category</label>
                    <input type="text" id="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name='category' value={input.category} onChange={handleInput}/>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">size</label>
                    <input type="number" id="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name='size' value={input.size } onChange={handleInput}/>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">price</label>
                    <input type="number" id="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name='price' value={input.price} onChange={handleInput}/>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">rating</label>
                    <input type="number" id="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name='rating' value={input.rating } onChange={handleInput}/>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Image URL</label>
                    <input type="text" id="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name='image_url' value={input.image_url } onChange={handleInput}/>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Release Year</label>
                    <input type="number" id="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name='release_year' value={input.release_year} onChange={handleInput}/>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Android</label>
                    <input type="number" id="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name='android' value={input.is_android_app} onChange={handleInput}/>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">IOS</label>
                    <input type="number" id="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name='ios' value={input.is_ios_app} onChange={handleInput}/>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
    </div>
  )
}
