export interface TokenPayload {
  id: string;
}

export interface User {
  _id: string;
  code: number;
  userName: string;
  bio: string;
  explain: string;
  phone: string;
  email: string;
  personalPage: string;
  instagram: string;
  businesses: Business[];
  primeJob?: string;
  createdAt: Date;
  headerUrl?: string;
  avatarUrl?: string;
}

export interface Business {
  _id: string;
  businessName: string;
  bio: string;
  phone: string;
  email: string;
  address: string;
  explain: string;
  agentCode: number;
  personalPage: string;
  instagram: string;
  longitude: number;
  latitude: number;
  guild: Guild;
  demandsForGuilds: Array<{
    guild: Guild;
  }>;
  monthlyCommitment: {
    product: Product;
  };
  workers: Array<{
    _id: string;
    code: number;
    userName: string;
  }>;
  headerUrl?: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Guild {
  _id: string;
  guildName: string;
  jobCategory: string;
}

export interface Product {
  _id: string;
  name: string;
  productName: string;
  unitOfMeasurement: string;
}

export interface Bill {
  _id: string;
  to: string;
  from: string;
  products: Array<{
    product: Product;
  }>;
  guild: string;
  isAccept: boolean;
  createdAt: Date;
}

export interface BusinessRelation {
  _id: string;
  provider: {
    _id: string;
    monthlyCommitment: {
      product: Product;
    };
  };
  receiver: string;
  isAnswerNeed: boolean;
  createdAt: Date;
}

export interface Request {
  _id: string;
  title: string;
  message: string;
  guild: string;
  acceptedBy?: string;
  requesterBusiness?: string;
  uniqCode: string;
  createdAt: Date;
} 