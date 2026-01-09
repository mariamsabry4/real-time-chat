import React from 'react';
import { create } from 'zustand';
import { api } from '../lib/axios';
export const useAuthStore = create ((set) => ({
    
authUser :null,
isSigningUp: false,
isLoggingIn:false,
isUpdatingProfile:false,
isCheckingAuth: true,


checkAuth: async()=>{
    try {
        const res = await api.get("/auth/check");

        set({authUser: res.data})
    } catch (error) {
        console.log("error in check", error);
        set({authUser: null});

        
    }
    finally{
        set({isCheckingAuth: false});  
    }
}
}));
