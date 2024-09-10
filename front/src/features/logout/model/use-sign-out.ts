import { useMutation } from 'react-query';
import { QueryKeys } from '@/shared/constants';
import { api, Endpoints } from '@/api';

export const useSignOut = () => {
    return useMutation(
        [QueryKeys.signOut],
        () => api.post(Endpoints.signOut),
        {
            onSuccess: () => {
                window.location.reload();
            }
        }
    );
}
