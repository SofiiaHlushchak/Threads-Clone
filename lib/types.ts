export interface PostInterface {
    id: string;
    user_id: string;
    text: string;
    parent_id: string | null;
    created_at?: string;
    User?: UserInterface;
    Post?: PostInterface[];
    file?: string | null;
    place_id?: string | null;
}

export interface UserInterface {
    id: string;
    username: string;
    avatar?: string;
}

export interface PlaceInterface {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
}
