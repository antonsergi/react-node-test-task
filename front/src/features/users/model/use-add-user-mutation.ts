import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from '@/shared/constants';
import { api, Endpoints, AxiosError } from '@/api';
import { UserProfile } from '@/shared/types/user';

type MutationParams = {
    email: string;
    password: string;
};

export const useAddUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<UserProfile, AxiosError, MutationParams>(
        [QueryKeys.addUser],
        (params) => api.post(Endpoints.users, params),
        {
            retry: false,
            onSuccess: () => {
                queryClient.invalidateQueries(QueryKeys.users);
            },
        }
    );
}
