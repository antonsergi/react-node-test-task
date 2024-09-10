import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/constants';
import { api, Endpoints } from '@/api';

export const useTransactionsQuery = () => {
    return useQuery(
        [QueryKeys.transactions],
        () => api.get(Endpoints.transaction).then(res => res.data),
        {
            staleTime: 5 * 60 * 1000, // 5min
            refetchOnWindowFocus: false,
            retry: false,
        }
    );
}
