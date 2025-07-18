import { useMemo } from 'react';
import { useAuthToken } from '@/utils/useAuthToken.tsx';
import { parseDE7ToDateTime } from '@/utils/DateTimeFormat.ts';

export const useSlipData = (transaction: any) => {
    const { getAuthData } = useAuthToken();
    const authData = getAuthData();

    const date = useMemo(() => {
        if (!transaction?.DE7) return { date: 'N/A', time: 'N/A' };
        const { date, time } = parseDE7ToDateTime(transaction.DE7);
        return { date, time };
    }, [transaction?.DE7]);

    return { authData, date };
};
