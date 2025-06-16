import axios from 'axios'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import type { IUser, RoomData } from '../utils/interface';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

interface AppContextType {
    currency: string;
    navigate: ReturnType<typeof useNavigate>;
    user: IUser | null | undefined;
    getToken: () => Promise<string>;
    isOwner: boolean;
    setIsOwner: (value: boolean) => void;
    axios: typeof axios;
    showHotelReg: boolean;
    setShowHotelReg: (value: boolean) => void;
    searchedCities: string[];
    setSearchedCities: React.Dispatch<React.SetStateAction<string[]>>;
    rooms: RoomData[];
    setRooms: React.Dispatch<React.SetStateAction<RoomData[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
interface AppProviderProps {
    children: ReactNode;
}


export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [showHotelReg, setShowHotelReg] = useState<boolean>(false);
    const [searchedCities, setSearchedCities] = useState<string[]>([]);
    const [rooms, setRooms] = useState<RoomData[]>([]);

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms')
            if (data.success) {
                setRooms(data.rooms)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const fetchUser = async () => {
        if (!user) {
            return;
        }
        try {
            const { data } = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });
            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities);
            } else {
                setTimeout(() => {
                    fetchUser();
                }, 5000)
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    useEffect(() => {
        fetchRooms();
    }, [])

    const value: any = {
        currency, navigate, user, getToken, isOwner, setIsOwner,
        axios, showHotelReg, setShowHotelReg, searchedCities, setSearchedCities, rooms, setRooms
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
