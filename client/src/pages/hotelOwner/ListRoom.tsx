import { useEffect, useState } from 'react'
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import type { RoomData } from '../../utils/interface';
import { RiHotelLine } from 'react-icons/ri';

const ListRoom = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const { axios, getToken, user, currency } = useAppContext();

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        setRooms(data.rooms)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const toggleAvailability = async (roomId: string) => {
    const { data } = await axios.post('/api/rooms/toggle-availability', { roomId }, {
      headers: {
        Authorization: `Bearer ${await getToken()}`
      }
    })
    if (data.success) {
      toast.success(data.message)
      fetchRooms();
    } else {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div className="max-w-full">
      <Title
        align="left"
        font="Outfit"
        title="Room Listings"
        subTitle="Easily view, update, and manage your listed rooms. Ensure details are accurate to deliver a seamless user experience."
      />
      <p className="text-lg text-gray-700 font-medium mt-8">All Rooms</p>
      <div className="w-full overflow-x-auto mt-4 border border-gray-200 rounded-lg shadow-sm">
        {rooms.length > 0 ? (
          <table className="w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-sm uppercase tracking-wider text-gray-600">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6 max-sm:hidden">Facility</th>
                <th className="py-4 px-6">Price / Night</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="py-4 px-6 text-gray-600 font-medium">{item.roomType}</td>
                  <td className="py-4 px-6 text-gray-600 max-sm:hidden">
                    {item.amenities.join(", ")}
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-medium">
                    {currency} {item.pricePerNight}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <label className="relative inline-flex items-center cursor-pointer gap-3">
                      <input
                        type="checkbox"
                        onChange={() => toggleAvailability(item._id)}
                        className="sr-only peer"
                        checked={item.isAvailable}
                      />
                      <div className='w-8 h-5 bg-slate-300 rounded-full peer peer-checked:bg-blue-600
                 transition-colors duration-200'></div>
                      <span className='dot absolute left-0.5 top-0.5 w-4 h-4 bg-white
                 rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-3.5'></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <RiHotelLine className="w-16 h-16 text-blue-500" />
            <p className="mt-4 text-md font-medium text-gray-600">
              No rooms available to display.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Add a room to start managing your listings.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListRoom