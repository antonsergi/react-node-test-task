import { useMutation } from 'react-query';
import { api, Endpoints, AxiosError } from '@/api';
import { QueryKeys } from '@/shared/constants';

type MutationProps = {
    email: string;
    password: string;
};

export const useSignInMutation = () => {
    return useMutation<void, AxiosError, MutationProps>(
        [QueryKeys.signIn],
        (mutationParams) => api.post<void>(Endpoints.signIn, mutationParams)
            .then(res => res.data),
    );
};
