import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type createUserRequest = {
    auth0Id: string,
    email: string
}

export const useCreateMyUser = () => {  // <----  this is custom hook

    const {getAccessTokenSilently} = useAuth0();

    const createMyUserRequest = async (user: createUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error('Failed to create user')
        }
    }

    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest);

    return { createUser, isLoading, isError, isSuccess }
}

type updateMyUSerRequest = {
    name: string,
    addressLine1: string,
    city: string,
    country: string
}

export const useGetMyUser = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const getMyUserRequest = async(): Promise<User> =>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            throw new Error('Failed to fetch user')
        }

        return response.json();
    }

    const {data: currentUser,isLoading,error} = useQuery('fetchCurrentUser',getMyUserRequest);

    if(error){
        toast.error(error.toString());
    }

    return {currentUser,isLoading};
}

export const useUpdateMyUser = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const updateMyUSerRequest = async(formData: updateMyUSerRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error('Failed to update user');
        }

        return response.json();
    }

    const {mutateAsync: updateUser,isLoading,isSuccess,error,reset} = useMutation(updateMyUSerRequest);

    if(isSuccess){
        toast.success('User Profile updated');
    }

    if(error){
        toast.error(error.toString() || 'Failed to update profile');
        reset();
    }

    return {updateUser,isLoading};
}