"use client"
import { useState } from 'react'
import { ChevronLeft } from "lucide-react"
// import Farmer from '../../public/farmer.jpg';
import Image from 'next/image';

// Mock data for farmers
const farmers = [
  { id: 1, img: "/farmer.jpg", name: "Amber Subhani", location: "Bijnor", crops: ["Corn", "Guava"], acreage: 500 },
  { id: 2, img: "/farmer.jpg", name: "Taha Rizvi", location: "Lucknow", crops: ["Grapes", "Cow Dunk"], acreage: 200 },
  { id: 3, img: "/farmer.jpg", name: "Sharjeel Afridi", location: "Shahjahanpur", crops: ["Sugarcane", "Wheat"], acreage: 1000 },
]

export default function Listings() {
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [contractCrop, setContractCrop] = useState("")
  const [contractDetails, setContractDetails] = useState("")

  const handleSelectFarmer = (farmer) => {
    setSelectedFarmer(farmer)
    setContractCrop("")
    setContractDetails("")
  }

  const handleSubmitContract = (e) => {
    e.preventDefault()
    alert(`Contract submitted for ${selectedFarmer.name} - Crop: ${contractCrop}, Details: ${contractDetails}`)
    setSelectedFarmer(null)
    setContractCrop("")
    setContractDetails("")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Farmer Marketplace</h1>
      {!selectedFarmer ? (
        <div className="flex flex-col gap-4">
          {farmers.map((farmer) => (
            <div key={farmer.id} className="flex items-center gap-10 border p-4 rounded shadow">
              <Image src={farmer.img} alt='farmer-image' width={100} height={100} className='h-fit md:w-[300px] w-[30vw]'/>
              <div className='flex flex-col gap-2'>
                <div>
                  <h3 className="text-3xl font-bold">{farmer.name}</h3>
                  <p>{farmer.location}</p>
                </div>
                <div>
                  <p className='font-medium'>Crops: <span className='text-gray-800 font-normal'>{farmer.crops.join(", ")}</span></p>
                  <p className='font-medium'>Acreage: <span className='text-gray-800 font-normal'>{farmer.acreage}</span></p>
                  <p className='text-blue-500  cursor-pointer hover:underline'>View location on map</p>
                </div>
                <div>
                  <button onClick={() => handleSelectFarmer(farmer)} className='bg-green-500 text-white px-2 py-3 rounded-md'>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedFarmer(null)} className="bg-gray-200 p-2 rounded mb-4 inline-flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to List
          </button>
          <div className="border rounded p-4 shadow">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{selectedFarmer.name}</h2>
              <p>{selectedFarmer.location}</p>
            </div>
            <div>
              <p>Crops: {selectedFarmer.crops.join(", ")}</p>
              <p>Acreage: {selectedFarmer.acreage}</p>
            </div>
            <form onSubmit={handleSubmitContract} className="mt-4 space-y-4">
              <div>
                <label htmlFor="crop" className="block font-semibold">Select Crop for Contract</label>
                <select
                  id="crop"
                  className="border rounded w-full p-2"
                  value={contractCrop}
                  onChange={(e) => setContractCrop(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a crop</option>
                  {selectedFarmer.crops.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="details" className="block font-semibold">Contract Details</label>
                <textarea
                  id="details"
                  className="border rounded w-full p-2"
                  placeholder="Enter contract details..."
                  value={contractDetails}
                  onChange={(e) => setContractDetails(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Contract</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
