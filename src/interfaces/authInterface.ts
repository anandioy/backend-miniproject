export interface Auth {
    fullname: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    // image: string;
    referralcode: string;
    redeemedPoints: number;
  }
  
  export interface LoginAuth {
    email: string;
    password: string;
  }