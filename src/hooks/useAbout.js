import { useState, useEffect } from 'react'
import { useCore } from '@/providers/CoreProvider'

export const useAbout = () => {
    const { octokit } = useCore();
    const [recentCommit, setRecentCommit] = useState('');

    // Get Recent Commit
    useEffect(() => {
        if (recentCommit) return;
        const getEvents = async () => {
            const res = await octokit.request('GET /users/{username}/events', {
                username: 'stephenasuncionDEV'
            })

            const { payload: { commits } } = res.data[0];
            const { message } = commits[commits.length - 1];

            setRecentCommit(message);
        }
        getEvents();
    }, [])

    return {
        recentCommit
    }
}