export interface IUser {
    _id: string;
    username: string;
    email: string;
    image: string;
    role: "hotelOwner" | "guest" | "admin";
    createdAt: string;
    updatedAt: string;
    __v: number;
    recentSearchedCities: string[];
}

export interface IHotel {
    _id: string;
    name: string;
    address: string;
    contact: string;
    owner: IUser;
    city: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IRoom {
    _id: string;
    images: string[];
    hotel: {
        name: string;
        address: string;
    };
    pricePerNight: number;
}

export interface HotelCardProps {
    room: IRoom;
    index: number;
}


export interface TitleProps {
    title: string;
    subTitle: string;
    align?: "left" | "center";
    font?: string;
}

export type Amenity =
    | "Free WiFi"
    | "Free Breakfast"
    | "Room Service"
    | "Mountain View"
    | "Pool Access";

export type Room = {
    amenities: Amenity[];
};

export interface CheckBoxProps {
    label: string;
    selected?: boolean;
    onChange?: (checked: boolean, label: string) => void;
}

export interface RadioButtonProps {
    label: string;
    selected?: boolean;
    onChange?: (label: string) => void;
}

export interface UserDummyData {
    _id: string;
    username: string;
    email: string;
    image: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    recentSearchedCities: string[];
}

export interface HotelData {
    _id: string;
    name: string;
    address: string;
    contact: string;
    owner: UserDummyData;
    city: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface RoomData {
    _id: string;
    hotel: HotelData;
    roomType: string;
    pricePerNight: number;
    amenities: string[];
    images: string[];
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface UserBookingData {
    _id: string;
    user: UserDummyData;
    room: RoomData;
    hotel: HotelData;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    guests: number;
    status: string;
    paymentMethod: string;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface DashboardData {
    totalBookings: number;
    totalRevenue: number;
    bookings: UserBookingData[];
}