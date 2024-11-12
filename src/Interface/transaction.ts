interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string | null;
    type: 'INCOME' | 'EXPENSE';
}

interface Category {
    id: number;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    transactions: Transaction[];
    totalAmount: number;
}

interface CategoriesResponse {
    message: string;
    data: Category[];
}
