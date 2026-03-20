import { api } from "@/lib/axios";

type SignupData = {
    fullname: string;
    email: string;
};

type PreferencesData = {
    roles: string[];
    skills: string[];
    minStipend?: string;
    location?: string;
};

export const signup = async(data: SignupData) => {
    const res = await api.post("/api/v1/auth/signup", data);
    return res.data;
};

export const verifyCode = async(code: string) => {
    const res = await api.post("/api/v1/auth/verify-email", {code});
    return res.data;
};

export const preferences = async(payload: PreferencesData) => {
    const res = await api.post("/api/v1/preferences", payload);
    return res.data;
};

export const signout = async() => {
    const res = await api.post("/api/v1/auth/signout");
    return res.data;
};