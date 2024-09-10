import { useMutation, useQueryClient } from 'react-query';
import { api, Endpoints, AxiosError } from '@/api';
import { QueryKeys } from '@/shared/constants';

type MutationProps = {
    id: number;
}

export const useDeleteTransactionMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError, MutationProps>(
        [QueryKeys.addTransaction],
        ({ id }) => api.delete(Endpoints.transactionByID.replace(':id', String(id))),
        {
            retry: false,
            onSuccess: () => {
                queryClient.invalidateQueries(QueryKeys.transactions);
            }
        }
    )
}
