import { useProfileQuery } from '@/features/protected/model/use-profile-query';
import { Role } from '@/shared/types/user';

export const useIsAdmin = () => {
    const { data } = useProfileQuery();

    return data?.role === Role.ADMIN;
}
