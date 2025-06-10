// User Interface
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

// Hotel Interface
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