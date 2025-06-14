import { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import type { DashboardData } from '../../utils/interface'
import { RiHotelLine, RiMoneyDollarCircleLine } from "react-icons/ri";

const Dashboard = () => {
    const { currency, user, getToken, axios } = useAppContext();

    const [dashboardData, setDashboardData] = useState<DashboardData>({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0,
    });

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/bookings/hotel', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });
            if (data.success) {
                setDashboardData(data.dashboardData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    return (
        <div>
            <Title align='left' font='Outfit' title='Dashboard'
                subTitle='Manage your room listings, track bookings, and analyze revenue seamlessly in one place. Gain real-time insights to optimize operations and boost efficiency.' />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 px-4">
                {/* Total Bookings */}
                <div className="bg-white shadow-sm border-l-4 border-blue-500 rounded-2xl p-6 flex items-center ">
                    <div className="flex items-center justify-center bg-blue-100 text-blue-500 rounded-full h-16 w-16 mr-6">
                        <RiHotelLine className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                        <p className="text-3xl font-bold text-blue-500">{dashboardData.totalBookings}</p>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-white shadow-sm border-l-4 border-green-500 rounded-2xl p-6 flex items-center">
                    <div className="flex items-center justify-center bg-green-100 text-green-500 rounded-full h-16 w-16 mr-6">
                        <RiMoneyDollarCircleLine className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-3xl font-bold text-green-500">{currency} {dashboardData.totalRevenue}</p>
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
            <div className="bg-white rounded-lg border border-gray-300 max-h-75">
                <div className="overflow-y-auto max-h-65" >
                    <table className="w-full border-collapse text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
                                <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Room Name</th>
                                <th className="py-3 px-4 text-gray-800 font-medium text-center">Total Amount</th>
                                <th className="py-3 px-4 text-gray-800 font-medium text-center">Payment Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {dashboardData.bookings.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                                        {item.user.username}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden text-center">
                                        {item.room.roomType}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                                        {currency} {item.totalPrice}
                                    </td>
                                    <td className="py-3 px-4 border-t border-gray-300 flex">
                                        <button
                                            className={`py-1 px-3 text-xs rounded-full mx-auto ${item.isPaid
                                                ? 'bg-green-200 text-green-600'
                                                : 'bg-amber-200 text-yellow-600'
                                                }`}
                                        >
                                            {item.isPaid ? 'Completed' : 'Pending'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Dashboard