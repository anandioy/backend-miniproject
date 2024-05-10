export interface Auth {
    username: string;
    email: string;
    password: string;
    phone: string;
    // image: string;
    referralcode: string;
    redeemedPoints: number;
  }
  
  export interface LoginAuth {
    email: string;
    password: string;
  }