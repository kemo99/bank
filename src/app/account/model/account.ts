export enum Operation {
    DEPOSIT = "DEPOSIT",
    WITHDRAW = "WITHDRAW"
}
export interface History {
    operation: Operation;
    date: Date;
    amount: number;
}

export interface Account {
    name: string;
    balance: number;
    history: History[];
}