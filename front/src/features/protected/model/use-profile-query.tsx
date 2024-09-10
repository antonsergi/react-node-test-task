import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/constants';
import { api, Endpoints } from '@/api';
import { UserProfile } from '@/shared/types/user';

export const useProfileQuery = () => {
    return useQuery<UserProfile>(
        [QueryKeys.profile],
        () => api.get<UserProfile>(Endpoints.profile).then(res => res.data),
        {
            staleTime: 1000 * 60 * 60, // 1hr
            retry: false,
            refetchOnWindowFocus: false,
        }
    )
}
