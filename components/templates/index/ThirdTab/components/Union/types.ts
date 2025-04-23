export interface Member {
    _id: string;
    businessName: string;
    businessBrand: string;
    guildName: string;
    avatar?: string;
}

export interface Vote {
    _id: string;
    voter: string;
    voteFor: string;
    createdAt: string;
} 