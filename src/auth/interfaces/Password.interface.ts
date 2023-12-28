export interface ChangeMyPasswordUserRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangePsswordAdminRequest {
    newPassword: string;
}