import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { use, useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls, setcalls] = useState<Call[]>([]);
    const [isLoading, setisLoading] = useState(false);
    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(() => {
        // We can not use async function directly in useEffect
        // So we are creating a new function and calling it inside useEffect
        const loadCalls = async () => {
            if (!client || !user?.id) return;

            setisLoading(true);

            try {
                // Refer: https://getstream.io/video/docs/react/guides/querying-calls/
                const { calls } = await client.queryCalls({
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } }
                        ]
                    },
                    sort: [{ field: 'starts_at', direction: -1 }],
                });
                setcalls(calls);
            } catch (error) {
                console.error(error);
            } finally {
                setisLoading(false);
            }
        }
        // Call the function
        loadCalls();
    }, [client, user?.id])

    const now = new Date();

    const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
        return (startsAt && new Date(startsAt) < now) && (endedAt && new Date(endedAt) < now);
    });

    const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
        return startsAt && new Date(startsAt) > now;
    })

    return {
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading,
    }
}