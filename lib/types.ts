export interface PostInterface {
    id: string;
    user_id: string;
    text: string;
    parent_id: string | null;
    created_at?: string;
    User?: UserInterface;
    Post?: PostInterface[];
    file?: string;
}

export interface UserInterface {
    id: string;
    username: string;
    avatar?: string;
}
