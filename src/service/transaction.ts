import axiosInstance from "@/utils/axiosInstance";



export const getIncomeCategory = async () => {
    const response = await axiosInstance.get("http://localhost:8080/api/v1/categories/type/INCOME");
    return response.data;
  };
  
  export const getExpenseCategory = async () => {
    const response = await axiosInstance.get("http://localhost:8080/api/v1/categories/type/EXPENSE");
    return response.data;
  };

  export const createCategory = async (categoryName: string) => {
    const response = await axiosInstance.post("http://localhost:8080/api/v1/categories",{
      name: categoryName,
      type: 'INCOME',  // Adjust the type if needed
    });
    return response.data;
  };

  export const createCategoryExpense = async (categoryName: string) => {
    const response = await axiosInstance.post("http://localhost:8080/api/v1/categories",{
      name: categoryName,
      type: 'EXPENSE',  // Adjust the type if needed
    });
    return response.data;
  };

  export const updateCategoryExpense = async (id: string) => {
    const response = await axiosInstance.put(`/categories/${id}`);
    return response.data; // Directly access response.data
  };

  export const deleteCategoryExpense = async (id: string) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data; // Directly access response.data
  };
  