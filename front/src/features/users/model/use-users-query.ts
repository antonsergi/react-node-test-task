import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/constants';
import { api, Endpoints } from '@/api';
import { UserProfile } from '@/shared/types/user';



export const useUsersQuery = () => {
    return useQuery<UserProfile[]>(
        [QueryKeys.users],
        () => api.get<UserProfile[]>(Endpoints.users).then(res => res.data),
        {
            staleTime: 5 * 60 * 1000, // 5min,
            refetchOnWindowFocus: false,
            retry: false,
        }
    )
};
