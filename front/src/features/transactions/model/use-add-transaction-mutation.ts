import { useMutation, useQueryClient } from 'react-query';
import { api, Endpoints, AxiosError } from '@/api';
import { QueryKeys } from '@/shared/constants';

type MutationProps = {
    value: number;
}

export const useAddTransactionMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError, MutationProps>(
        [QueryKeys.addTransaction],
        (params) => api.post(Endpoints.transaction, params),
        {
            retry: false,
            onSuccess: () => {
                queryClient.invalidateQueries(QueryKeys.transactions);
            }
        }
    )
}
