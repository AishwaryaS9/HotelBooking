import { useState, type FormEvent } from 'react'
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import type { AddRoomInputs, Amenity } from '../../utils/interface';
import { LiaCloudUploadAltSolid } from "react-icons/lia";

const AddRoom = () => {
    const { axios, getToken } = useAppContext();
    const [images, setImages] = useState<{ [key: string]: File | null }>({
        1: null,
        2: null,
        3: null,
        4: null
    });

    const [inputs, setInputs] = useState<AddRoomInputs>({
        roomType: '',
        pricePerNight: 0,
        amenities: {
            'Free WiFi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false
        }
    });
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (!inputs.roomType || !inputs.pricePerNight || !inputs.amenities || !Object.values(images).some(image => image)) {
            toast.error("Please fill in all the details");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('roomType', inputs.roomType)
            formData.append('pricePerNight', String(inputs.pricePerNight))

            const amenities = Object.keys(inputs.amenities).filter((key) => inputs.amenities[key as Amenity])
            formData.append('amenities', JSON.stringify(amenities));

            Object.keys(images).forEach((key) => {
                images[key] && formData.append('images', images[key])
            })

            const { data } = await axios.post('/api/rooms/', formData, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });
            if (data.success) {
                toast.success(data.message);
                setInputs({
                    roomType: '',
                    pricePerNight: 0,
                    amenities: {
                        'Free WiFi': false,
                        'Free Breakfast': false,
                        'Room Service': false,
                        'Mountain View': false,
                        'Pool Access': false
                    }
                });
                setImages({ 1: null, 2: null, 3: null, 4: null })
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" max-w-full pb-2">
            <form onSubmit={onSubmitHandler}>
                {/* Title Section */}
                <Title
                    align="left"
                    font="Outfit"
                    title="Add Room"
                    subTitle="Provide accurate details, pricing, and amenities to showcase your room and attract more bookings effectively."
                />

                {/* Image Upload Section */}
                <p className="text-lg font-medium text-gray-800 mt-10">Upload Images</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    {Object.keys(images).map((key) => (
                        <label htmlFor={`roomImage${key}`} key={key} className="cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center bg-gray-100 hover:border-blue-500">
                                {images[key] ? (
                                    <img
                                        className="h-full w-full object-cover rounded-lg"
                                        src={URL.createObjectURL(images[key]!)}
                                        alt={`Room Image ${key}`}
                                    />
                                ) : (
                                    <LiaCloudUploadAltSolid className="h-10 w-10 opacity-60 text-blue-500" />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                id={`roomImage${key}`}
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setImages({ ...images, [key]: file });
                                }}
                            />
                        </label>
                    ))}
                </div>

                {/* Room Details Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                    <div>
                        <p className="text-lg font-medium text-gray-800">Room Type</p>
                        <select
                            value={inputs.roomType}
                            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        >
                            <option value="">Select Room Type</option>
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Luxury Room">Luxury Room</option>
                            <option value="Family Suite">Family Suite</option>
                        </select>
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-800">
                            Price <span className="text-sm">(per night)</span>
                        </p>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                            value={inputs.pricePerNight}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    pricePerNight: Number(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>

                {/* Amenities Section */}
                <p className="text-lg font-medium text-gray-800 mt-8">Amenities</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {Object.keys(inputs.amenities).map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={`amenities${index + 1}`}
                                checked={inputs.amenities[amenity as keyof typeof inputs.amenities]}
                                onChange={() =>
                                    setInputs({
                                        ...inputs,
                                        amenities: {
                                            ...inputs.amenities,
                                            [amenity]: !inputs.amenities[amenity as keyof typeof inputs.amenities],
                                        },
                                    })
                                }
                                className="rounded text-blue-500 focus:ring focus:ring-blue-300"
                            />
                            <label
                                htmlFor={`amenities${index + 1}`}
                                className="text-gray-600 cursor-pointer"
                            >
                                {amenity}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="mt-10">
                    <button
                        type="submit"
                        className={`px-8 py-3 text-lg font-medium text-white rounded-lg transition ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Room"}
                    </button>
                </div>
            </form>
        </div>

    )
}

export default AddRoom