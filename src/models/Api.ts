export interface ApiResponse<T = Partial<any>> {
    message: string;
    success: boolean;
    data?: T;
    error?: string;
}
